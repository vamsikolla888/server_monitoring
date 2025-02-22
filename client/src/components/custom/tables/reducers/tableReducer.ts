import { ITable, TableReducerActions } from "../types";


export const tableReducer = (state: ITable, action: TableReducerActions): ITable => {
    switch(action.type) {
        case "SET_TABLEFIELDS": 
            return { ...state, tableFields: action.payload.tableFields };
        case "SET_FORMFIELDS":
            return { ...state, formFields: action.payload.formFields };
        case "SET_SORTFIELD":
            return { ...state, filter: { ...state.filter, sortField: action.payload.sortField, direction: action.payload.direction }}
        default:
            return state;
    }
}

