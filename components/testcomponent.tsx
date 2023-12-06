import { useDataContext } from "@/context/data-context"
import React from 'react'

const TestComponent = () => {
    const { user } = useDataContext()
    return (
        <div>{JSON.stringify(user)}</div>
    )
}

export default TestComponent