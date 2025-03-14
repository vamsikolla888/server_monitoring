import React, { createContext, useState } from "react";
import { FileManagerHistory, IFileManagerContext } from "../types/types";

interface FileManagerProviderProps {
    children: React.ReactNode
}

export const FileManagerContext = createContext<IFileManagerContext | undefined>(undefined);
export default function FileManagerProvider({ children }: FileManagerProviderProps) {
    const [fileManagerHistory, setFileManagerHistory] = useState<FileManagerHistory[]>([]);
    const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string | undefined>();
    const [search, setSearch] = useState<string | undefined>();
    return (
        <FileManagerContext.Provider value={{ fileManagerHistory, setFileManagerHistory, currentDirectoryPath, setCurrentDirectoryPath, search, setSearch }}>
            {children}
        </FileManagerContext.Provider>
    )
}
