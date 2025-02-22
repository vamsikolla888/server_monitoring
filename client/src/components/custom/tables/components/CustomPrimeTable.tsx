import React, { useContext, useState } from "react";
import { DataTable, DataTableSelectionChangeParams } from "primereact/datatable";
import { TableContext } from "../context/TableProvider";
import { ChevronDown, ChevronUp, EllipsisVertical, Edit, Trash } from "lucide-react";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { IField } from "../types";
import { MenubarMenu, Menubar, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import SortIcon from "./SortIcon";
import sortIcon from "./SortIcon";

export interface CustomPrimeTableProps {
    results: any[],
    tableFields: IField[],
}

export default function CustomPrimeTable({ results, tableFields }: CustomPrimeTableProps) {
    const { state } = useContext(TableContext);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const actionBodyTemplate = () => (
        <div className="flex items-center space-x-2">
            <button className="text-blue-500 hover:text-blue-700">
                <Edit className="w-4 h-4" />
            </button>
            <button className="text-red-500 hover:text-red-700">
                <Trash className="w-4 h-4" />
            </button>
        </div>
    );

    const onSelectionChange = (e: DataTableSelectionChangeParams) => {
        setSelectedRows(e.value);
    };

    const bodyTemplate = (data: any, field: string) => (
        <TooltipProvider>
            <Tooltip>
                <TooltipContent>
                    {data[field]}
                </TooltipContent>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {data[field]}
                </div>
            </Tooltip>
        </TooltipProvider>
    );

    return (
        <div className="bg-background shadow-md rounded-lg overflow-hidden">
            <DataTable
                value={results}
                selection={selectedRows}
                onSelectionChange={onSelectionChange}
                sortIcon={sortIcon}
                resizableColumns
                columnResizeMode="expand"
                scrollable
                stripedRows
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                filterIcon={() => <EllipsisVertical className="w-4 h-4 text-gray-500" />}
                className="p-datatable-custom"
                showGridlines
                emptyMessage="No records found"
                rowHover
                sortMode="single"
                removableSort
                style={{ maxWidth: "100%" }}
            >   
                {tableFields.map((field) => (
                    <Column
                        key={field.name}
                        field={field.searchKey}
                        // header={getSortIcon(field)}
                        header={field.header}
                        sortable
                        filter
                        body={(data) => bodyTemplate(data, field.searchKey)}
                        headerClassName="bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2"
                        bodyClassName="dark:bg-neutral-800 text-gray-600 px-4 py-2 text-xs"
                        filterPlaceholder={`Search ${field.header}`}
                        filterMatchMode="contains"
                        showFilterMatchModes={false}
                        showFilterMenuOptions={false}
                        showApplyButton={false}
                        showClearButton={false}
                        filterMenuClassName="shadow border-gray-200 border-[1px] max-w-[300px]"
                    />
                ))}
            </DataTable>
        </div>
    );
}