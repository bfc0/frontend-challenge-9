import React from 'react'
import Plus from '@/public/images/icon-plus.svg'
import Minus from '@/public/images/icon-minus.svg'
import Image from "next/image"
const Score = ({ comment }: { comment: PostComment }) => {
    return (
        <div className=" md:row-start-1 md:col-start-1 md:row-end-4 md:col-end-1 min-w-[4em] row-start-5 col-start-1 col-span-2 md:max-w-[4em] flex" >
            <div className="bg-verylightgray p-2 rounded-lg min-w-[2rem] flex md:flex-col items-center justify-between w-full md:max-w-[3em]">
                <div className="text-center flex items-center"><Image src={Plus} alt="plus" /></div>
                <div className="text-center flex items-center font-bold text-moderateblue">{comment?.score}</div>
                <div className="text-center flex items-center"><Image src={Minus} alt="minus" /></div>
            </div>
        </div>
    )
}

export default Score 