"use client"
import React, { useState } from "react";

type DataContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
}
export const DataContext = React.createContext<DataContextType | null>(null)

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <DataContext.Provider value={{
            user,
            setUser,
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