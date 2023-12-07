import React from 'react'

const Modal = ({ closeFn, confirmFn }) => {
    const Backdrop = ({ closeFn }) => (
        <div
            className="fixed top-0 left-0 w-full h-full bg-darkblue opacity-50 z-50"
            onClick={closeFn}
        ></div>
    );
    return (
        <>
            <Backdrop closeFn={closeFn} />
            <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-50 w-[min((20rem),100%)] md:w-1/2 lg:w-1/3 ">
                <div className="flex flex-col items-start justify-between  h-full p-4">
                    <div className="flex items-center w-full">
                        <div className="text-gray-900 font-bold text-xl py-4">Delete comment</div>

                    </div>
                    <div className="text-grayishblue">Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone</div>
                    <div className="flex justify-between w-full mt-auto pt-4">
                        <button
                            onClick={closeFn}
                            className="mr-auto bg-grayishblue text-white uppercase py-2 px-4 rounded-md hover:bg-opacity-80">
                            no, cancel
                        </button>
                        <button
                            onClick={confirmFn}
                            className="ml-auto mr-0 bg-softred text-white uppercase py-2 px-4 rounded-md hover:bg-opacity-80">
                            yes, delete
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Modal