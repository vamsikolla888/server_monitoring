export const uiReducerInitialState = {
    tableFields: [],
    formFields: [],
}


export const uiReducerActions = {
    ADD_AND_UPDATE_TABLE_FIELDS: "add_and_update_table_fields",
}


/**
 * 
 * @typedef {Object} State 
 * @property {Array} tableFields
 * @property {Array} formFields
 */

/**
 * 
 * @typedef {Object} Action 
 * @property {string} type 
 */


/**
 * 
 * @param {State} state 
 * @param {Action} action 
 * @returns 
 */
function uiReducer(state, action){
    switch(action.type){
        case uiReducerActions.ADD_AND_UPDATE_TABLE_FIELDS: 
            return { ...state, tableFields: action.tableFields }
    }
}

export default uiReducer