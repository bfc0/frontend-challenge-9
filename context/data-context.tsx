"use client"
import { ActionSchemaType, ResponseSchemaType } from "@/lib/validate";
import React, { useState } from "react";

type DataContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    executeAction: ((data: ActionSchemaType) => ResponseSchemaType) | null,
    setExecuteAction: React.Dispatch<React.SetStateAction<((data: ActionSchemaType) => ResponseSchemaType) | null>>,
}

export const DataContext = React.createContext<DataContextType | null>(null)

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [executeAction, setExecuteAction] = useState<((data: ActionSchemaType) => ResponseSchemaType) | null>(null)

    return (
        <DataContext.Provider value={{
            user,
            setUser,
            executeAction,
            setExecuteAction,
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