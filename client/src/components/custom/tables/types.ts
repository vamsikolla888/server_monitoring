import { IFilter } from "@/pages/filemanager/types/types";
import { Dispatch, SetStateAction } from "react";
import { ICustomFormField } from "../form/types";

export interface ITable {
    results?: [],
    filter?: IFilter,
    page?: Number,
    limit?: Number,
    totalCount?: Number
    tableFields: ITableField[]
    formFields: ICustomFormField[],
    filterFields: ICustomFormField[],
    selectedRows?: Array<object>,
    data?: object;
    isEditForm?: boolean;
    isFormOpen?: boolean;
    showAlert?: boolean;
    createHandler?: (values: any, setLoading: Dispatch<SetStateAction<boolean>> ) => void;
    updateHandler?: (values: any, id: string, setLoading: Dispatch<SetStateAction<boolean>>) => void;
    deleteHandler?: (selectedIds: string[], setLoading: Dispatch<SetStateAction<boolean>>) => void;
    refetch?: () => void;
}

export const initialTableValues: ITable = {
    results: [],
    filter: { criteria: [], sortField: "created", direction: "desc", page: 1, limit: 10, globalSearch: null },
    page: 1,
    limit: 10,
    totalCount: 0,
    tableFields: [],
    formFields: [],
    filterFields: [],
}

export interface IField {
    name: string,
    header: string,
    searchKey: string,
    Icon?: React.ElementType
}

export interface ITableField {
    name: string;
    field: string;
    header: string;
    label?: string;
    id?: string | number
    filter: boolean
    sortable: boolean;
    displayInTable: boolean
    width?: number;
    customStyle?: ColumnStyles;
    extraProps?: object;
    propKeys?: Array<string>;
    noProps?: boolean;
    fieldExtractor?: (data: any, column: ITableField) => any;
}


export type TableReducerActions =
    { type: "SET_TABLEFIELDS", payload: { tableFields: Array<object> } } |
    { type: "SET_PAGINATION", payload: { page?: number, limit?: number, totalCount?: number }} |
    { type: "SET_FORMFIELDS", payload: { formFields: Array<ICustomFormField> } } |
    { type: "SET_FILTERS", payload: { filter: IFilter  }} | 
    { type: "SET_FILTERFIELDS", payload: { filterFields: Array<ICustomFormField>} } |
    { type: "SET_SORTFIELD", payload: { sortField: string, direction: string } } | 
    { type: "SET_SELECTED_ROWS", payload: { selectedRows: Array<object> } } | 
    { type: "SET_ROW_DATA", payload: { data: any, isEdit?: boolean, isFormOpen?: boolean } } | 
    { type: "CLEAR_FORM_DEPENDENCIES", payload: void } |
    { type: "SET_FORM_STATE", payload: { isFormOpen: boolean }} |
    { type: "UPDATE_FORM_HANDLER", payload: { createHandler: (values: any, setLoading: Dispatch<SetStateAction<boolean>>) => void, updateHandler: (values: any, id: string, setLoading: Dispatch<SetStateAction<boolean>>) => void, deleteHandler: (selectedIds: string[], setLoading: Dispatch<SetStateAction<boolean>>) => void, refetch: () => void }} |
    { type: "OPEN_ALERT", payload: null } |
    { type: "CLOSE_ALERT", payload: null } |
    { type: "ALL", payload: { data: any }}

export interface ITableContext {
    dispatch: Dispatch<TableReducerActions>;
    state: ITable
}

export type ColumnStyles = 
    "Actions" | "Date" | "Date Time"