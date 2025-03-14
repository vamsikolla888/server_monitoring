import { ITable, TableReducerActions } from "../types";

export const tableReducer = (state: ITable, action: TableReducerActions): ITable => {
    switch (action.type) {
        case "SET_TABLEFIELDS":
            return {
                ...state,
                tableFields: action.payload.tableFields
            };

        case "SET_FILTERFIELDS":
            return {
                ...state,
                filterFields: action.payload.filterFields
            };

        case "SET_PAGINATION":
            return {
                ...state,
                page: action.payload.page,
                limit: action.payload.limit,
            };

        case "SET_FILTERS":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload.filter
                }
            };

        case "SET_FORMFIELDS":
            return {
                ...state,
                formFields: action.payload.formFields
            };

        case "SET_SORTFIELD":
            return {
                ...state,
                filter: {
                    ...state.filter,
                    sortField: action.payload.sortField,
                    direction: action.payload.direction
                }
            };

        case "SET_SELECTED_ROWS":
            return {
                ...state,
                selectedRows: action.payload.selectedRows
            };

        case "SET_ROW_DATA":
            return {
                ...state,
                data: action.payload.data,
                isEditForm: action.payload.isEdit ?? false,
                isFormOpen: action.payload.isFormOpen ?? false
            };

        case "CLEAR_FORM_DEPENDENCIES":
            return {
                ...state,
                data: null,
                isEditForm: false
            };

        case "SET_FORM_STATE":
            return {
                ...state,
                isFormOpen: action.payload.isFormOpen,
                // Reset data and isEditForm only when closing form
                ...(action.payload.isFormOpen === false && { data: null, isEditForm: false })
            };

        case "UPDATE_FORM_HANDLER":
            return {
                ...state,
                createHandler: action.payload.createHandler,
                updateHandler: action.payload.updateHandler,
                deleteHandler: action.payload.deleteHandler,
                refetch: action.payload.refetch
            };

        case "OPEN_ALERT":
            return {
                ...state,
                showAlert: true
            };

        case "CLOSE_ALERT":
            return {
                ...state,
                showAlert: false
                // Optionally reset alert data if you have `alertData: null` or similar
                // alertData: null
            };

        case "ALL":
            return {
                ...state,
                ...action.payload.data
            };

        default:
            return state;
    }
};


