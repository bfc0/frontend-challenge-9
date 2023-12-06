import React from 'react'

const Replies = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div className="bg-verylightgray w-24 flex justify-center">
                <div className="w-[2px] h-full bg-lightgray"></div>
            </div>
            <div className="flex flex-col gap-5 w-full">{children}</div>
        </div>
    )
}

export default Replies