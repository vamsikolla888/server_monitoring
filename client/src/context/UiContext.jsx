import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import uiReducer, { uiReducerInitialState } from "../reducers/uireducer";

export const UiContext = createContext();

export const UiProvider = ( { children }) => {
    const [ state, dispatch ] = useReducer(uiReducer, uiReducerInitialState);

    return (
        <UiContext.Provider value={{ uiProviderState: state, uiDispatcher: dispatch }}>
            {children}
        </UiContext.Provider>
    )
}


UiProvider.propTypes = {
    children: PropTypes.node.isRequired,
}