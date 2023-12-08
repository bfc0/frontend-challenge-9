import React from 'react'
import Plus from '@/public/images/icon-plus.svg'
import Minus from '@/public/images/icon-minus.svg'
import Image from "next/image"
import { useDataContext } from "@/context/data-context"

const Score = ({ comment }: { comment: PostComment }) => {
    const { executeAction } = useDataContext()

    function clickPlus() {
        if (!executeAction) return
        executeAction({ action: "upvote", id: comment.id })
    }
    function clickMinus() {
        if (!executeAction) return
        executeAction({ action: "downvote", id: comment.id })
    }


    return (
        <div className=" md:row-start-1 md:col-start-1 md:row-end-4 md:col-end-1 min-w-[4em] row-start-5 col-start-1 col-span-2 md:max-w-[4em] flex md:m-auto" >
            <div className="bg-verylightgray rounded-lg min-w-[2rem] flex md:flex-col items-center justify-between w-full md:max-w-[3em]">
                <button
                    onClick={clickPlus}
                    className=" w-full h-full p-2 md:p-4 flex justify-center items-center">
                    <Image src={Plus} alt="plus" />
                </button>
                <div className="text-center flex items-center font-bold p-2 text-moderateblue w-full justify-center">{comment?.score}</div>
                <button
                    onClick={clickMinus}
                    className="text-center flex items-center  p-2 md:p-4 w-full justify-center">
                    <Image src={Minus} alt="minus" />
                </button>
            </div>
        </div>
    )
}

export default Score 