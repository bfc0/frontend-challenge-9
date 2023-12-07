"use client"
import Modal from "@/components/modal"
import { useDataContext } from "@/context/data-context"
import React, { useEffect, useState } from 'react'
const Test = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="m-auto">
            <h1>test</h1>
            <p>Test</p>
            {showModal &&
                <Modal conFirmFn={() => { console.log("confirm") }} closeFn={() => { setShowModal(false) }} />}
            <p>Testteststk</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi a quidem voluptates necessitatibus culpa, similique quis voluptatem molestiae velit maiores dolor explicabo molestias debitis recusandae, quaerat placeat enim eaque officiis.</p>
            <button
                className="bg-darkblue text-white p-2 rounded-md"
                onClick={() => setShowModal(true)}>Open</button>
        </div>
    )
}

export default Test