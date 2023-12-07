import Image from "next/image"
import React, { useState } from 'react'
import Reply from '@/public/images/icon-reply.svg'
import Edit from '@/public/images/icon-edit.svg'
import Delete from '@/public/images/icon-delete.svg'
import AddComment from "./AddComment"
import { useDataContext } from "@/context/data-context"
import Modal from "./modal"

const Comment = ({ comment, handleReply }: { comment: PostComment, handleReply: (data: ReplyData) => void }) => {
    const { user, handleUpdate, handleDelete } = useDataContext()
    const isMyComment = comment.user && comment.user.username === user?.username

    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)

    function clickUpdate() {
        if (handleUpdate === null) return
        const newContent = (document.querySelector(`#edit-${comment.id}`) as HTMLTextAreaElement).value
        handleUpdate({ id: comment.id, content: newContent })
        setIsEditing(p => !p)
    }

    function confirmDelete() {
        if (!handleDelete) return
        handleDelete(comment.id)
    }

    return (
        <>
            <div className="bg-white p-6 radius rounded-md flex w-full ">
                <div className="pr-4 border">
                    <div className="bg-verylightgray p-2 rounded-lg min-w-[2rem] flex flex-col align-middle">
                        <div className="text-center">+</div>
                        <div className="text-center">{comment?.score}</div>
                        <div className="text-center">-</div>
                    </div>
                </div>
                <div className="w-full border border-y-softred">
                    <div className="flex py-2 items-center gap-4">
                        <Image src={comment?.user?.image.png.slice(1)} alt="avatar" width={40} height={40} />
                        <div className="font-semibold text-darkblue">
                            {comment.user?.username}
                            {isMyComment &&
                                <span className="bg-moderateblue text-white ml-3 px-1">you</span>}
                        </div>
                        <div className="text-grayishblue">{comment.createdAt}</div>
                        {isMyComment ?
                            (<div className="justify-self-end flex ml-auto gap-5">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="flex   items-center gap-2 font-bold text-softred">
                                    <Image src={Delete} alt="" />Delete</button>
                                <button
                                    onClick={() => setIsEditing(p => !p)}
                                    className="flex   items-center gap-2 font-bold text-moderateblue">
                                    <Image src={Edit} alt="" />Edit</button>
                            </div>)
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
                            : <p>
                                {comment.replyingTo &&
                                    <span className="text-grayishblue font-semibold">
                                        @{comment.replyingTo}, </span>}
                                {comment.content}</p>
                        }
                    </div>
                    {isEditing &&
                        <div className="flex">
                            <button
                                onClick={clickUpdate}
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

            {showModal && <Modal closeFn={() => setShowModal(false)} confirmFn={() => { confirmDelete(); setShowModal(false) }} />}
        </>
    )
}

export default Comment