import Image from "next/image"
import React, { useState } from 'react'
import Reply from '@/public/images/icon-reply.svg'
import Edit from '@/public/images/icon-edit.svg'
import Delete from '@/public/images/icon-delete.svg'
import AddComment from "./addcomment"
import { useDataContext } from "@/context/data-context"
import Modal from "./modal"
import Score from "./score"

const Comment = ({ comment }: { comment: PostComment }) => {
    const { user, executeAction } = useDataContext()
    const isMyComment = comment.user && comment.user.username === user?.username

    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)

    function clickUpdate() {
        if (executeAction === null) return
        const newContent = (document.querySelector(`#edit-${comment.id}`) as HTMLTextAreaElement).value
        const result = executeAction({ action: "update", id: comment.id, content: newContent })
        if (!result.ok) return

        setIsEditing(p => !p)
    }

    function confirmDelete() {
        if (!executeAction) return
        executeAction({ action: "delete", id: comment.id })
    }

    return (
        <>
            <div className="bg-white p-6 radius rounded-md  w-full grid grid-cols-4 grid-rows-5 gap-0! md:grid-cols-6 md:grid-cols-[minmax(4em, auto),1fr,1fr,1fr,1fr,1fr] md:grid-rows-[1fr,1fr,1fr,1fr] shadow-sm">
                {/* {score component} */}
                <Score comment={comment} />

                {/* {title} */}
                <div className="font-semibold text-darkblue flex items-center  gap-2 md:row-start-1 md:col-start-2 md:row-end-1 md:col-span-full
               row-start-1 col-start-1 col-span-4 " >
                    <Image src={comment?.user?.image.png.slice(1)} alt="avatar" width={40} height={40} />
                    {comment.user?.username}
                    {isMyComment &&
                        <span className="bg-moderateblue text-white ml-3 px-1">you</span>}
                    <div className="text-grayishblue overflow-hidden">{comment.createdAt}</div>
                </div>

                {/* {buttons} */}
                <div className="flex items-center row-start-5 col-start-3 col-span-2  md:row-start-1 md:col-start-5 md:row-end-1 md:col-span-full" >
                    {isMyComment ?
                        (<div className="justify-self-end flex ml-auto gap-5 align-middle ">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex   items-center gap-2 font-bold text-softred hover:text-palered">
                                <Image src={Delete} alt="" />Delete</button>
                            <button
                                onClick={() => setIsEditing(p => !p)}
                                className="flex   items-center gap-2 font-bold text-moderateblu hover:text-lightgrayishblue">
                                <Image src={Edit} alt="" />Edit</button>
                        </div>)
                        :
                        (<button
                            onClick={() => setIsReplying(p => !p)}
                            className="justify-self-end ml-auto flex   items-center gap-2 font-bold text-moderateblue hover:text-lightgrayishblue">
                            <Image src={Reply} alt="" />Reply </button>)
                    }
                </div>
                {/* {main content} */}
                <div className="text-grayishblue   md:row-start-2 md:col-start-2 md:row-end-4 md:col-span-full row-start-2 row-span-3 col-start-1 col-span-4" >
                    {isEditing ?
                        <textarea id={`edit-${comment.id}`} className="leading-4 w-full  rounded-lg p-2 px-4  resize-none no-scrollbar overflow-hidden border-grayishblue hover:cursor-pointer border" rows={5} defaultValue={comment.content} />
                        : <p>
                            {comment.replyingTo &&
                                <span className="text-moderateblue font-semibold">
                                    @{comment.replyingTo}, </span>}
                            {comment.content}</p>
                    }
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
                <AddComment originalId={comment.id} toggleReplying={() => setIsReplying(false)} />}

            {showModal && <Modal closeFn={() => setShowModal(false)} confirmFn={() => { confirmDelete(); setShowModal(false) }} />}
        </>
    )
}

export default Comment