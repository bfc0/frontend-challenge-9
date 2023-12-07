"use client"
import React, { useState } from "react";

type DataContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    handleUpdate: (() => void) | null,
    setHandleUpdate: React.Dispatch<React.SetStateAction<(() => void) | null>>,
    handleDelete: (() => void) | null,
    setHandleDelete: React.Dispatch<React.SetStateAction<(() => void) | null>>,
}

export const DataContext = React.createContext<DataContextType | null>(null)

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [handleUpdate, setHandleUpdate] = useState<(() => void) | null>(null)
    const [handleDelete, setHandleDelete] = useState<(() => void) | null>(null)


    return (
        <DataContext.Provider value={{
            user,
            setUser,
            handleUpdate,
            setHandleUpdate,
            handleDelete,
            setHandleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useDataContext() {
    const context = React.useContext(DataContext)
    if (!context) {
        throw new Error("useDataContext must be used within a provider")
    }
    return context
}