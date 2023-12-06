import Image from "next/image"
import React, { useState } from 'react'
import Reply from '@/public/images/icon-reply.svg'
import Edit from '@/public/images/icon-edit.svg'
import AddComment from "./AddComment"
import { useDataContext } from "@/context/data-context"

const Comment = ({ comment, handleReply }: { comment: PostComment, handleReply: (data: ReplyData) => void }) => {
    const { user } = useDataContext()
    const isMyComment = comment.user && comment.user.username === user?.username

    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
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
                        <div className="font-semibold text-darkblue">
                            {comment.user?.username}
                            {isMyComment &&
                                <span className="bg-moderateblue text-white ml-3 px-1">you</span>}
                        </div>
                        <div className="text-grayishblue">{comment.createdAt}</div>
                        {isMyComment ?
                            (<button
                                onClick={() => setIsEditing(p => !p)}
                                className="justify-self-end ml-auto flex   items-center gap-2 font-bold text-moderateblue">
                                <Image src={Edit} alt="" />Edit</button>)
                            :
                            (<button
                                onClick={() => setIsReplying(p => !p)}
                                className="justify-self-end ml-auto flex   items-center gap-2 font-bold text-moderateblue">
                                <Image src={Reply} alt="" />Reply </button>)
                        }
                    </div>

                    <div className="text-grayishblue">
                        {isEditing ?
                            <textarea id={`edit-${comment.id}`} className="leading-4 w-full border rounded-lg p-2 px-4  resize-none no-scrollbar overflow-hidden border-grayishblue hover:cursor-pointer" rows={5} defaultValue={comment.content} />
                            :
                            `${comment.content}`}
                        <p className="border">{JSON.stringify(comment)}</p>
                    </div>
                    {isEditing &&
                        <div className="flex">
                            <button
                                className="bg-moderateblue rounded-md py-2 px-4 text-white uppercase font-normal text-sm self ml-auto mr-0">
                                Update
                            </button>
                        </div>
                    }
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
                        }} />
            }

        </>
    )
}

export default Comment