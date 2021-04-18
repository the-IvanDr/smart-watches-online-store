import * as types from '../types.js';

const isBrowser = typeof window !== 'undefined';

const initialState = {
    header: {
        tabs: [true, false, false, false, false]
    }
}


export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADMIN_HEADER_CHANGE_TAB:
            return ADMIN_HEADER_CHANGE_TAB_Handler(state, action);

        default: return state;
    }
}

const ADMIN_HEADER_CHANGE_TAB_Handler = (state, action) => {
    console.log("ADMIN_HEADER_CHANGE_TAB_Handler");

    const TAB_INDEX = action.payload.tabIndex;

    const NEW_TABS = state.header.tabs.map(tab => {
        if (tab) tab = false;
        return tab;
    });
    NEW_TABS[TAB_INDEX] = true;


    return {
        ...state,
        header: {
            ...state,
            tabs: NEW_TABS
        }
    }
}