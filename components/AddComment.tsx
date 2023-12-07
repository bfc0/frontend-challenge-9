import { useDataContext } from "@/context/data-context"
import Image from "next/image"
import React from 'react'


const AddComment = ({ to, originalId, handleReply }:
    { to: string | null, originalId: number | null, handleReply: (data: ReplyData) => void }) => {
    const { user } = useDataContext()

    function onClick() {
        const element = document.querySelector(`#replyto-${originalId}`) as HTMLTextAreaElement
        const content = element.value
        // console.log("content=", content)
        if (!content) return

        handleReply({
            originalId: originalId,
            content: content,
        })
        element.value = ""
    }

    return (
        <div className="bg-white p-6 radius rounded-md flex gap-2 items-start">
            <div className="pr-4">
                {!!user ?
                    <Image src={user.image?.png?.slice(1)} alt="avatar" width={40} height={40} /> :
                    <div className="w-[40px] h-[40px] bg-lightgrayishblue rounded-full m-0"></div>}
            </div>
            <div className="w-full ">
                <textarea id={`replyto-${originalId}`} className="leading-4 w-full border rounded-lg p-2 px-4  resize-none no-scrollbar overflow-hidden border-grayishblue hover:cursor-pointer" rows={5} />
            </div>
            <button
                onClick={onClick}
                className="bg-moderateblue rounded-md py-2 px-4 text-white uppercase font-normal text-sm">
                {!!originalId ? "reply" : "send"}
            </button>
        </div >
    )
}

export default AddComment