import React, { createContext, useReducer } from "react";
import { initialTableValues, ITable, ITableContext } from "../types";
import { Outlet } from "react-router-dom";
import { tableReducer } from "../reducers/tableReducer";

interface TableProviderProps {
    children: React.ReactNode
}
export const TableContext = createContext<ITableContext | undefined>(undefined);
export default function TableProvider({ children }: TableProviderProps) {
    const [state, dispatch] = useReducer(tableReducer, initialTableValues)
    return (
        <TableContext.Provider value={{ state, dispatch }}>
            <Outlet />
        </TableContext.Provider>
    )
}