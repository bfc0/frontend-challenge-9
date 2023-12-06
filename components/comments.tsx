"use client"

import { useEffect, useState } from "react"
import Comment from "./comment"
import AddComment from "./AddComment"
import React from "react";
import Replies from "./replies";
import { useDataContext } from "@/context/data-context";
import { findById, findFirstLevelPostByCommentId, findHighestId } from "@/utils";



const Comments = ({ data: { currentUser, comments } }: { data: { currentUser: User, comments: PostComment[] } }) => {
    const [allComments, setAllComments] = useState(comments);
    const { user, setUser } = useDataContext()
    const nextId = findHighestId(allComments) + 1
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
            origin.replies.push(newComment)
        } else {
            allComments.push(newComment)
        }
        setAllComments(p => [...p])
    }

    const handleUpdate = () => {
    }

    useEffect(() => { setUser(currentUser) }, [])

    return (
        <section className="flex flex-col gap-4">
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