import { IFilter } from "@/pages/filemanager/types/types";
import { Dispatch, SetStateAction } from "react";

export interface ITable {
    results?: [],
    filter?: IFilter,
    page?: Number,
    limit?: Number,
    totalCount?: Number
    tableFields: Array<object>,
    formFields: ICustomFormField[],
}

export const initialTableValues: ITable = {
    results: [],
    filter: { criteria: [], sortField: "created", direction: "desc", page: 1, limit: 20 },
    page: 1,
    limit: 20,
    totalCount: 0,
    tableFields: [],
    formFields: [],
}

export interface IField {
    name: string,
    header: string,
    searchKey: string,
    Icon?: React.ElementType
}

export type TableReducerActions =
    { type: "SET_TABLEFIELDS", payload: { tableFields: Array<object> } } |
    { type: "SET_FORMFIELDS", payload: { formFields: Array<ICustomFormField> } } |
    { type: "SET_SORTFIELD", payload: { sortField: string, direction: string } }