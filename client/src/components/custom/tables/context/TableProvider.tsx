import React, { createContext, useReducer } from "react";
import { initialTableValues, ITable } from "../types";
import { IFilter } from "@/pages/filemanager/types/types";
import { Outlet } from "react-router-dom";
import { tableReducer } from "../reducers/tableReducer";

interface TableProviderProps {
    children: React.ReactNode
}
export const TableContext = createContext<ITable | undefined>(undefined);
export default function TableProvider({ children }: TableProviderProps) {
    const [state, dispatch] = useReducer(tableReducer, initialTableValues)
    return (
        <TableContext.Provider value={{ state, dispatch }}>
            <Outlet />
        </TableContext.Provider>
    )
}