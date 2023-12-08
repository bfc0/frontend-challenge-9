"use client"

import { useEffect, useState } from "react"
import Comment from "./comment"
import AddComment from "./AddComment"
import React from "react";
import Replies from "./replies";
import { useDataContext } from "@/context/data-context";
import { findAndDeleteById, findById, findFirstLevelPostByCommentId, findHighestId } from "@/lib/utils";
import { ActionSchema } from "@/lib/validate";



const Comments = ({ data: { currentUser, comments } }: { data: { currentUser: User, comments: PostComment[] } }) => {
    const [allComments, setAllComments] = useState(comments);
    const { user, setUser, setHandleUpdate, setHandleDelete, setExecuteAction } = useDataContext()
    const [nextId, setNextId] = useState(findHighestId(allComments) + 1)

    const renderReplies = (replies: PostComment[]) => (
        <Replies>
            {replies.map(reply => <Comment key={reply.id} comment={reply} handleReply={handleReply} />)}
        </Replies>
    );

    const handleReply = (data: ReplyData) => {
        if (!user) return

        const newComment = {
            id: nextId,
            user: user,
            createdAt: "just now",
            score: 0,
            content: data.content,
            replies: []
        }

        if (data.originalId) {
            const origin = findFirstLevelPostByCommentId(data.originalId, allComments)
            if (!origin) throw new Error("Can't find a message to reply to!")
            if (origin.user?.username)
                newComment.replyingTo = origin.user.username
            origin.replies.push(newComment)
        } else {
            setAllComments(p => [...p, newComment])
        }
        setAllComments(p => [...p])
        setNextId(p => p + 1)
    }

    const handleUpdate = (data: unknown) => {
        // console.log("handling update!, data: ", data)
        if (!data || !data.id || !data.content || !user) return

        const o = findById(data.id, allComments)
        if (!o)
            throw new Error(`Could not find the comment to update`)
        if (!o.user || o.user.username !== user?.username)
            throw new Error(`You don't have the rights to modify that comment!: ${o.user.username} ${user?.username}`)
        o.content = data.content
        // console.log(o)
        setAllComments(p => [...p])

    }
    const handleDelete = (id: number) => {
        if (!id || !user) return
        const o = findById(id, allComments)
        if (!o)
            throw new Error(`Could not find the comment to delete`)
        if (!o.user || o.user.username !== user?.username)
            throw new Error(`You don't have the rights to delete that comment!: ${o.user.username} ${user?.username}`)

        findAndDeleteById(id, allComments)
        setAllComments(p => [...p])
    }

    const executeAction = (data: unknown) => {
        const parsedData = ActionSchema.safeParse(data)
        if (!parsedData.success) {
            return
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
        }
        setAllComments(p => [...p])

    }

    useEffect(() => {
        setUser(currentUser)
        setHandleUpdate(() => handleUpdate)
        setHandleDelete(() => handleDelete)
        setExecuteAction(() => executeAction)
    }, [user, allComments])

    return (
        <section className="flex flex-col gap-4 w-full sm:w-[min(90%,800px)] lg:w-[min(60%),800px] ">
            {allComments.map(comment => (
                <React.Fragment key={comment.id}>
                    <Comment comment={comment} handleReply={handleReply} />
                    {
                        Array.isArray(comment.replies) &&
                        comment.replies.length > 0 &&
                        renderReplies(comment.replies)
                    }
                </React.Fragment>
            ))}
            <AddComment to={null} originalId={null} handleReply={handleReply} />
        </section>
    );
};

export default Comments