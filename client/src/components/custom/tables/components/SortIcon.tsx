import { useEffect } from "react";
import { IconType } from "primereact/utils";
import { DataTable, SortOrder } from "primereact/datatable";
import { ArrowDown, ChevronUp, ChevronDown, ArrowUp } from "lucide-react";
import { useContext, useEffect } from "react";
import { TableContext } from "../context/TableProvider";
import { ITable } from "../types";

export default function sortIcon(
    options: IconType<DataTable<any[]>, { sortOrder?: SortOrder; sorted?: boolean }>
) {
    const { dispatch } = useContext(TableContext) as { dispatch: React.Dispatch<TableReducerActions> };
    // console.log("OTO", options);
    return (
        <span onClick={() => dispatch({ type: "SET_SORTFIELD", payload: { sortField: options?.props?.column?.props?.field, direction: options?.sortOrder === 1 ? "asc" : "desc" }})}>
            {options?.sortOrder === 1 ? (
                <ArrowUp className="size-4 dark:text-neutral-50" />
            ) : options?.sortOrder === -1 ? (
                <ArrowDown className="size-4 dark:text-neutral-50" />
            ) : (
                <span className="flex flex-col">
                    <ChevronUp className="w-3 h-3 text-gray-400" />
                    <ChevronDown className="w-3 h-3 -mt-1 text-gray-400" />
                </span>
            )}
        </span>
    );
}
