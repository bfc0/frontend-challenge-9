import Image from "next/image"
import React, { useState } from 'react'
import Reply from '@/public/images/icon-reply.svg'
import AddComment from "./AddComment"

const Comment = ({ comment, handleReply }: { comment: PostComment, handleReply: (data: ReplyData) => void }) => {

    const [isReplying, setIsReplying] = useState(false)
    return (
        <>
            <div className="bg-white p-6 radius rounded-md flex w-full ">
                <div className="pr-4">
                    <div className="bg-verylightgray p-2 rounded-lg min-w-[2rem] flex flex-col align-middle">
                        <div className="text-center">+</div>
                        <div className="text-center">{comment?.score}</div>
                        <div className="text-center">-</div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex py-2 items-center gap-4">
                        <Image src={comment?.user?.image.png.slice(1)} alt="avatar" width={40} height={40} />
                        <div className="font-semibold text-darkblue">{comment.user?.username}</div>
                        <div className="text-grayishblue">{comment.createdAt}</div>
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="justify-self-end ml-auto flex   items-center gap-2 font-bold text-moderateblue">
                            <Image src={Reply} alt="" />Reply </button>
                    </div>
                    <div className="text-grayishblue">{comment.content}</div>
                </div>
            </div >
            {isReplying &&
                <AddComment
                    to={comment.user.username}
                    originalId={comment.id}
                    handleReply={
                        (args) => {
                            handleReply(args)
                            setIsReplying(false)
                        }} />}

        </>
    )
}

export default Comment