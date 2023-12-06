"use client"
import TestComponent from "@/components/testcomponent"
import { useDataContext } from "@/context/data-context"
import React from 'react'
const Test = () => {

    const { user, setUser } = useDataContext()
    setUser({
        image: {
            png: "ksjafk",
            webp: "kjsfk",
        },
        username: "test"
    })
    return (
        <div>
            <h1>Page here:</h1>
            <TestComponent />
        </div>
    )
}

export default Test