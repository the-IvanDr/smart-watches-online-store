import * as types from '../types';
import * as APIQuery from '../../utils/APIQuery';

const brandValidation = (form) => {
    const MINIMALL_BRAND_NAME_LENGTH = 2;
    const messages = [];

    if (!form.photo.trim()) {
        messages.push('Отсутствует фото бренда');
    }
    if (!form.name.trim() || form.name.length < MINIMALL_BRAND_NAME_LENGTH) {
        messages.push(`Название бренда не корректно (мин. ${MINIMALL_BRAND_NAME_LENGTH} символа)`);
    }

    return messages;
}

const typeValidation = (form) => {
    const MINIMALL_TYPE_NAME_LENGTH = 3;
    const messages = [];

    if (!form.name.trim() || form.name.length < MINIMALL_TYPE_NAME_LENGTH) {
        messages.push(`Короткое название типа (мин. ${MINIMALL_TYPE_NAME_LENGTH} символов)`);
    }

    return messages;
}

const productValidation = (form) => {
    const SRC_MINIMAL_SIZE = 10;
    const TITLE_MINIMAL_SIZE = 4;
    const DESCRIPTION_MINIMAL_SIZE = 100;

    const messages = [];

    if (form.mainImageSrc.trim().length < SRC_MINIMAL_SIZE) messages.push('Выбирите фото товара');
    if (form.title.trim().length < TITLE_MINIMAL_SIZE) messages.push('Введите корректное название твоара');
    if (form.price <= 0) messages.push('Введите цену товара');
    if (form.discount < 0) messages.push('Скидка не может быть меньше 0');
    if (form.wight < 0) messages.push('Вес товара не может быть меньше 0');
    if (form.description.text <= DESCRIPTION_MINIMAL_SIZE) messages.push(`Слишком короткое описание товара. Миниальная длина ${DESCRIPTION_MINIMAL_SIZE} символов`);

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

    openCreator: () => {
        return {
            type: types.ADMIN_PRODUCTS_TABS_CREATOR
        }
    },

    openView: (productId) => {
        return {
            type: types.ADMIN_PRODUCTS_TABS_VIEW,
            payload: { productId }
        }
    },

    openList: () => {
        return {
            type: types.ADMIN_PRODUCTS_TABS_LIST
        }
    },

    getList: (jwt) => async dispatch => {
        try {
            const response = await APIQuery.Products.getList(jwt);

            return dispatch({
                type: types.ADMIN_PRODUCTS_GET_LIST,
                payload: { products: response.data.products }
            })

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
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

    getTypesAndBrands: (jwt) => async dispatch => {
        try {
            const resTypes = await APIQuery.Types.getList(jwt);
            const resBrands = await APIQuery.Brands.getList(jwt);

            return dispatch({
                type: types.ADMIN_PRODUCTS_GET_BRANDS_AND_TYPES,
                payload: { types: resTypes.data.types, brands: resBrands.data.brands }
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: 'Ошибка соединения с сервером, загрузить фото не удалось. Попробуйте позже...', error }
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
    },

    create: (jwt, form) => async dispatch => {
        try {
            const errorMessages = productValidation(form);
            if (errorMessages.length) throw new Error(errorMessages.join(';\n'));

            const data = {
                ...form,
                typeId: form.types.find(type => type.active).id,
                brandId: form.brands.find(brand => brand.active).id,
                character: form.character.find(char => char.active).name,
                description: form.description.text
            };

            delete data.types;
            delete data.brands;

            const response = await APIQuery.Products.create(jwt, data);
            console.log('response', response.data);
            if (response.data.errors) throw new Error(response.data.errors.join(';\n'));

            return dispatch({
                type: types.ADMIN_PRODUCTS_CREATE
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

    select: (brandId) => {
        return {
            type: types.ADMIN_BRANDS_TABS_SELECT,
            payload: { brandId }
        }
    },

    openCreator: () => {
        return { type: types.ADMIN_BRANDS_TABS_CREATOR }
    },

    openList: () => {
        return { type: types.ADMIN_BRANDS_TABS_LIST }
    },

    getList: (jwt) => async dispatch => {
        try {
            const response = await APIQuery.Brands.getList(jwt);
            const { brands } = response.data;

            return dispatch({
                type: types.ADMIN_BRANDS_GET_LIST,
                payload: { brands }
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
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
            if (errorMessages.length) throw new Error(errorMessages.join(', '));

            const response = await APIQuery.Brands.create(jwt, form);
            if (!response.data.success) throw new Error(response.data.message);

            return dispatch({
                type: types.ADMIN_BRANDS_CREATE
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    },

    delete: (jwt, brandId) => async dispatch => {
        try {
            const response = await APIQuery.Brands.delete(jwt, brandId);
            if (!response.data.success) throw new Error('Ошибка. Не удалось удалить бренд из базы данных...')

            return dispatch({
                type: types.ADMIN_BRANDS_TABS_LIST
            });

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

    getList: (jwt) => async dispatch => {
        const response = await APIQuery.Types.getList(jwt);
        const list = response.data.types;

        return dispatch({
            type: types.ADMIN_TYPES_GET_LIST,
            payload: { list }
        })
    },

    openCreator: () => {
        return { type: types.ADMIN_TYPES_TABS_CREATOR }
    },

    select: (typeId) => {
        return {
            type: types.ADMIN_TYPES_TABS_SELECT,
            payload: { typeId }
        }
    },

    openList: () => {
        return {
            type: types.ADMIN_TYPES_TABS_LIST
        }
    },

    create: (jwt, form) => async dispatch => {
        try {
            const errorMessages = typeValidation(form);
            if (errorMessages.length) throw new Error(errorMessages.join(', '));

            const response = await APIQuery.Types.create(jwt, form);
            if (!response.data.success) throw new Error(response.data.message);

            return dispatch({
                type: types.ADMIN_TYPES_CREATE
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    },

    delete: (jwt, typeId) => async dispatch => {
        try {
            const response = await APIQuery.Types.delete(jwt, typeId);
            if (!response.data.success) throw new Error('Ошибка. Не удалось удалить тип из базы данных...')

            return dispatch({
                type: types.ADMIN_TYPES_TABS_LIST
            });

        } catch (error) {
            return dispatch({
                type: types.ADMIN_ERROR_ALERT,
                payload: { message: error.message, error }
            });
        }
    }
}