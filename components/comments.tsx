"use client"

import { useEffect, useState } from "react"
import Comment from "./comment"
import AddComment from "./addcomment"
import React from "react";
import Replies from "./replies";
import { useDataContext } from "@/context/data-context";
import { findAndDeleteById, findById, findFirstLevelPostByCommentId, findHighestId } from "@/lib/utils";
import { ActionSchema, ActionSchemaType, ResponseSchemaType } from "@/lib/validate";
import toast from "react-hot-toast";



const Comments = ({ data: { currentUser, comments } }: { data: { currentUser: User, comments: PostComment[] } }) => {
    const [allComments, setAllComments] = useState(comments);
    const { user, setUser, setExecuteAction } = useDataContext()
    const [nextId, setNextId] = useState(findHighestId(allComments) + 1)

    const renderReplies = (replies: PostComment[]) => (
        <Replies>
            {replies.map(reply => <Comment key={reply.id} comment={reply} />)}
        </Replies>
    );



    const executeAction = (data: ActionSchemaType): ResponseSchemaType => {
        try {
            const parsedData = ActionSchema.safeParse(data)
            if (!parsedData.success) {
                throw new Error(parsedData.error.issues[0].message)
            }
            switch (parsedData.data.action) {
                case "upvote": {
                    const o = findById(parsedData.data.id, allComments)
                    if (!o) throw new Error("Comment was not found")
                    o.score++
                    break
                }
                case "downvote": {
                    const o = findById(parsedData.data.id, allComments)
                    if (!o) throw new Error("Comment was not found")
                    o.score <= 0 ? o.score = 0 : o.score--
                    break
                }
                case "delete": {
                    const o = findById(parsedData.data.id, allComments)
                    if (!o) throw new Error("Comment was not found")
                    if (!o.user || o.user.username !== user?.username)
                        throw new Error(`You don't have the rights to delete that comment!: ${o.user.username} ${user?.username}`)
                    findAndDeleteById(parsedData.data.id, allComments)
                    break
                }
                case "newmessage": {
                    const newComment = {
                        id: nextId,
                        user: user,
                        createdAt: "just now",
                        score: 0,
                        content: parsedData.data.content,
                        replies: []
                    } as PostComment
                    if (parsedData.data.originalId) {
                        const origin = findFirstLevelPostByCommentId(parsedData.data.originalId, allComments)
                        if (!origin) throw new Error("Can't find a message to reply to!")
                        if (origin.user?.username)
                            newComment.replyingTo = origin.user.username
                        origin.replies.push(newComment)
                    } else {
                        setAllComments(p => [...p, newComment])
                    }
                    setNextId(p => p + 1)
                    break;
                }
                case "update": {
                    const o = findById(parsedData.data.id, allComments)
                    if (!o)
                        throw new Error(`could not find the comment to update`)
                    if (!o.user || o.user.username !== user?.username)
                        throw new Error(`you don't have the rights to modify that comment!: ${o.user.username} ${user?.username}`)
                    o.content = parsedData.data.content
                }
            }

        } catch (e: unknown) {
            if (!(e instanceof Error)) {
                return { ok: false, error: "Unknown error" }
            }
            toast.error(e.message)
            return { ok: false, error: e.message }
        }

        setAllComments(p => [...p])
        return { ok: true, }
    }

    useEffect(() => {
        setUser(currentUser)
        setExecuteAction(() => executeAction)
    }, [user, allComments])

    return (
        <section className="flex flex-col gap-4 w-full sm:w-[min(90%,800px)] lg:w-[min(60%),800px] ">
            {allComments.map(comment => (
                <React.Fragment key={comment.id}>
                    <Comment comment={comment} />
                    {Array.isArray(comment.replies) &&
                        comment.replies.length > 0 &&
                        renderReplies(comment.replies)}
                </React.Fragment>
            ))}
            <AddComment originalId={null} />
        </section>
    );
};

export default Comments