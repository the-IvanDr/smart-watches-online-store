import * as types from '../types';

export function changeTabs(tabIndex) {
    return {
        type: types.ADMIN_HEADER_CHANGE_TAB,
        payload: { tabIndex }
    }
}