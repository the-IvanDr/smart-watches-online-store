import * as types from '../types';

export function changeTabs(tab) {
    return {
        type: types.ADMIN_HEADER_CHANGE_TAB,
        payload: { tab }
    }
}

export function addProductImage(files) {
    return {
        type: types.ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE,
        payload: { files }
    }
}

export function changeProductInputs(field, value) {
    return {
        type: types.ADMIN_PRODUCTS_FORM_CHANGE,
        payload: { field, value }
    }
}

export function loadDescriptionImages(){
    
}