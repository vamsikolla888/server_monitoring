import React, { useContext, useRef } from "react";
import { DataTable, DataTableSelectionSingleChangeEvent } from "primereact/datatable";
import { TableContext } from "../context/TableProvider";
import { EllipsisVertical } from "lucide-react";
import { Column } from "primereact/column";
import { ITableContext, ITableField } from "../types";
import columnStyles from "./datatable-column-styles";
import CommonPaginator from "@/common/paginator/CommonPaginator";
import CustomAlertDialog from "./alert-dialog";
import DatatableToolbar from "./datatable-toolbar";
import ColumnHeader from "./datatable-column-header";


export interface CustomPrimeTableProps {
    results: any[],
    tableFields: ITableField[],
    children?: React.ReactNode,
}

export default function CustomPrimeTable({ children, results, tableFields }: CustomPrimeTableProps) {
    const datatableRef = useRef(null);
    const { state, dispatch } = useContext(TableContext) as ITableContext;
    const onSelectionChange = (e: DataTableSelectionSingleChangeEvent<any[]>) => {
        dispatch({ type: "SET_SELECTED_ROWS", payload: { selectedRows: e.value }})
    };



    return (
        <div className="dark:bg-main_background overflow-hidden">
            {children}
            <DataTable
                ref={datatableRef}
                value={results}
                selection={state?.selectedRows ?? []}
                onSelectionChange={onSelectionChange}
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
                scrollHeight="420px"
                footer={() => <CommonPaginator />}
            >
                {tableFields.map((field) => (
                    <Column
                        key={field.name}
                        field={field.field}
                        // header={field.header}
                        header={options => <ColumnHeader {...{...options, ...field }}/>}
                        sortable={field.sortable}
                        filter={field.filter}
                        body={(data, options) => columnStyles(data, options, field)}
                        headerClassName="dark:bg-content_background text-gray-700 text-xs font-semibold"
                        bodyClassName="text-gray-600 px-4 py-3 text-xs"
                        filterPlaceholder={`Search ${field.header}`}
                        filterMatchMode="contains"
                        showFilterMatchModes={false}
                        showFilterMenuOptions={false}
                        showApplyButton={false}
                        showClearButton={false}
                        filterMenuClassName="shadow border-gray-200 border-[1px] max-w-[300px]"
                        {...field?.extraProps}
                    />
                ))}
            </DataTable>
            <CustomAlertDialog />
        </div>
    );
}

CustomPrimeTable.Toolbar = DatatableToolbar;
CustomPrimeTable.Advanced = (props:CustomPrimeTableProps) => (
        <CustomPrimeTable {...props}>
            <CustomPrimeTable.Toolbar />
        </CustomPrimeTable>
) 