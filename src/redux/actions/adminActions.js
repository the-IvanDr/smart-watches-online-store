import * as types from '../types';
import * as APIQuery from '../../utils/APIQuery';


const brandValidation = (form) => {
    const MINIMALL_BRAND_NAME_LENGTH = 2;
    const messages = [];
    let isValid = true;

    if (!form.photo.trim()) {
        isValid = false;
        messages.push('Отсутствует фото бренда');
    }
    if (!form.name.trim() || form.name.length < MINIMALL_BRAND_NAME_LENGTH) {
        isValid = false;
        messages.push(`Название бренда не корректно (мин. ${MINIMALL_BRAND_NAME_LENGTH} символа)`);
    }

    return messages;
}

const typeValidation = (form) => {
    const MINIMALL_TYPE_NAME_LENGTH = 3;
    const messages = [];
    let isValid = true;

    if (!form.name.trim() || form.name.length < MINIMALL_TYPE_NAME_LENGTH) {
        isValid = false;
        messages.push(`Короткое название типа (мин. ${MINIMALL_TYPE_NAME_LENGTH} символов)`);
    }

    return messages;
}


export const changeTabs = (tab) => {
    return {
        type: types.ADMIN_HEADER_CHANGE_TAB,
        payload: { tab }
    }
}

export const ProductActions = {
    changeInputs: (field, value) => {
        return {
            type: types.ADMIN_PRODUCTS_FORM_CHANGE,
            payload: { field, value }
        }
    },

    uploadProductImage: (jwt, file) => async dispatch => {

        try {
            const response = await APIQuery.Products.uploadMainImage(jwt, file);
            const src = response.data.src; //`${APIQuery.SERVER_ADDRESS}/images/main/${response.data.src}`;

            return dispatch({
                type: types.ADMIN_PRODUCTS_UPLOAD_PRODUCT_IMAGE,
                payload: { src }
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: 'Ошибка соединения с сервером, загрузить фото не удалось. Попробуйте позже...', error }
            });
        }
    },

    removeProductImage: (jwt, imageSrc) => async dispatch => {
        try {
            const response = await APIQuery.Products.removeMainImage(jwt, { imageSrc });
            if (!response.data.success) throw new Error("Удалить файл не удалось");

            return dispatch({
                type: types.ADMIN_PRODUCTS_REMOVE_PRODUCT_IMAGE,
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    },

    uploadDescriptionImages: (jwt, files) => async dispatch => {
        try {
            const response = await APIQuery.Products.uploadDescriptionImages(jwt, files);
            const { sources } = response.data;

            return dispatch({
                type: types.ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES,
                payload: { sources }
            })

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    },

    removeDescriptionImage: (jwt, imageSrc) => async dispatch => {
        try {
            const response = await APIQuery.Products.removeDescriptionImage(jwt, { imageSrc });

            if (!response.data.success) throw new Error('Удаление файл не удалось');

            return dispatch({
                type: types.ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES,
                payload: { imageSrc }
            });


        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    }
}

export const BrandActions = {
    changeInputs: (field, value) => {
        return {
            type: types.ADMIN_BRANDS_FORM_CHANGE,
            payload: { field, value }
        }
    },

    uploadImage: (jwt, file) => async dispatch => {
        try {
            const response = await APIQuery.Brands.uploadImage(jwt, file);
            const { src } = response.data;

            return dispatch({
                type: types.ADMIN_BRANDS_UPLOAD_IMAGE,
                payload: { src }
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    },

    removeImage: (jwt, imageSrc) => async dispatch => {
        try {
            const response = await APIQuery.Brands.removeImage(jwt, { imageSrc });
            if (!response.data.success) throw new Error("Удалить файл не удалось, пропробуйте позже...");

            return dispatch({
                type: types.ADMIN_BRANDS_REMOVE_IMAGE
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    },

    create: (jwt, form) => async dispatch => {
        try {
            const errorMessages = brandValidation(form);
            console.log('test: ', errorMessages.length)
            if (errorMessages.length) throw new Error(errorMessages.join(', '));

            const response = await APIQuery.Brands.create(jwt, form);
            if (response.data.success) {
                return dispatch({
                    type: types.ADMIN_BRANDS_CREATE
                });

            } else throw new Error(response.data.message);

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    }
}

export const TypeActions = {
    changeInputs: (field, value) => {
        return {
            type: types.ADMIN_TYPES_FORM_CHANGE,
            payload: { field, value }
        }
    },

    create: (jwt, form) => async dispatch => {
        try {
            const errorMessages = typeValidation(form);
            if (errorMessages.length) throw new Error(errorMessages.join(', '));

            return dispatch({
                type: types.ADMIN_TYPES_CREATE
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    }
}