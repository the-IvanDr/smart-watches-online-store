import * as types from '../types.js';

const isBrowser = typeof window !== 'undefined';

const initialState = {
    header: {
        tabs: {
            users: true,
            products: false,
            orders: false,
            brands: false,
            types: false
        }
    },

    products: {
        createForm: {
            photos: [],
            title: '',
            price: 0,
            discount: 0,
            types: [],
            brands: [],
            character: [
                {
                    name: 'Женский',
                    active: true
                },
                {
                    name: 'Мужской',
                    active: false
                },
                {
                    name: 'Детский',
                    active: false
                }
            ],
            isHit: false,
            isNovelty: false
        }
    }
}


export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADMIN_HEADER_CHANGE_TAB:
            return ADMIN_HEADER_CHANGE_TAB_Handler(state, action);

        case types.ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE:
            return ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_CHANGE:
            return ADMIN_PRODUCTS_FORM_CHANGE_Handler(state, action);

        default: return state;
    }
}

const ADMIN_HEADER_CHANGE_TAB_Handler = (state, action) => {
    console.log("ADMIN_HEADER_CHANGE_TAB_Handler");

    const TAB_TO_SET_ACTIVE = action.payload.tab;
    const NEW_TABS = { ...state.header.tabs };

    for (let key in NEW_TABS) {
        NEW_TABS[key] = false;
        if (key === TAB_TO_SET_ACTIVE)
            NEW_TABS[key] = true;
    }

    return {
        ...state,
        header: {
            ...state.header,
            tabs: NEW_TABS
        }
    }

}

const ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE', action.payload);

    const IMG_FILE = action.payload.files[0];

    // If file wasn't selected, return previos state
    if (typeof IMG_FILE === 'undefined') return state;

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                photos: [IMG_FILE]
            }
        }
    }
}

const ADMIN_PRODUCTS_FORM_CHANGE_Handler = (state, action) => {
    console.log("ADMIN_PRODUCTS_FORM_CHANGE", action.payload);

    const FIELD = action.payload.field;
    const VALUE = action.payload.value;

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                [FIELD]: VALUE
            }
        }
    };
}