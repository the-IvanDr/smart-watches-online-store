import * as types from '../types';
import * as APIQuery from '../../utils/APIQuery';

export const changeTabs = (tab) => {
    return {
        type: types.ADMIN_HEADER_CHANGE_TAB,
        payload: { tab }
    }
}

export const addProductImage = (files) => {
    return {
        type: types.ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE,
        payload: { files }
    }
}

export const changeProductInputs = (field, value) => {
    return {
        type: types.ADMIN_PRODUCTS_FORM_CHANGE,
        payload: { field, value }
    }
}

export const uploadDescriptionImages = (jwt, files) => async dispatch => {
    try {
        const response = await APIQuery.UploadDescriptionImages(jwt, files);
        const sources = response.data.sources.map(src => `${APIQuery.SERVER_ADDRESS}/images/product-description/${src}`);

        return dispatch({
            type: types.ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES,
            payload: { sources }
        })

    } catch (error) {
        return dispatch({
            type: types.ADMIN_ERROR_ALERT,
            payload: { message: 'Ошибка соединения с сервером, загрузить фото не удалось. Попробуйте позже...', error }
        });
    }
}

export const removeDescriptionImage = (jwt, imageSrc) => async dispatch => {
    try {
        const response = await APIQuery.RemoveDescriptionImage(jwt, { imageSrc });

        if (!response.data.success) throw new Error('Удаление изображения не удалось');

        return dispatch({
            type: types.ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES,
            payload: { imageSrc }
        });


    } catch (error) {
        return dispatch({
            type: types.ADMIN_ERROR_ALERT,
            payload: { message: 'Ошибка соединения с сервером, удалить фото не удалось. Попробуйте позже...', error }
        });
    }
}