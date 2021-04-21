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
            isNovelty: false,

            // details
            series: '',
            os: '',
            osCompatibility: '',
            watchShape: '',
            bodyMaterial: '',
            strapMaterial: '',
            bodyColor: '',
            strapColor: '',
            displayType: '',
            displayDiagonal: '',
            displayResolution: '',
            monitoring: '',
            sensors: '',
            batteryType: '',
            batteryCapacity: '',
            standbyTime: '',
            dimensions: '',
            weight: 0.0,
            equipment: '',
            features: '',
            isTouchDisplay: false,
            isReplaceableStrap: false,
            isStrapLengthAdjusment: false,
            isMoistureAndDustProtection: false,
            isPhoneCalls: false,
            isGpsSupport: false,

            description: {
                text: '',
                imagesSrc: []
            }
        }
    }
}


export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADMIN_ERROR_ALERT:
            return ADMIN_ERROR_ALERT_Handler(state, action);

        case types.ADMIN_HEADER_CHANGE_TAB:
            return ADMIN_HEADER_CHANGE_TAB_Handler(state, action);

        case types.ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE:
            return ADMIN_PRODUCTS_ADD_PRODUCT_IMAGE_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_CHANGE:
            return ADMIN_PRODUCTS_FORM_CHANGE_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES:
            return ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES:
            return ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES_Handler(state, action);

        default: return state;
    }
}

const ADMIN_ERROR_ALERT_Handler = (state, action) => {
    console.log('ADMIN_ERROR_ALERT', action.payload);

    const ERROR = action.payload.error;
    const MESSAGE = action.payload.message;

    console.log("Error: ", ERROR.message);
    alert(MESSAGE);

    return state;
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

const ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES', action.payload);

    const IMAGE_SOURCES = action.payload.sources;

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                description: {
                    ...state.products.createForm.description,
                    imagesSrc: [...state.products.createForm.description.imagesSrc, ...IMAGE_SOURCES]
                }
            }
        }

    }
}

const ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES', action.payload);

    const IMAGE_SRC = action.payload.imageSrc;
    const IMAGES_SRCS = state.products.createForm.description.imagesSrc.filter(src => src != IMAGE_SRC);

    // regexp for <img />:       "<img[^>]* src=\"([^\"]*)\"[^>]*>"
    const newDescription = state.products.createForm.description.text
        .replace(new RegExp(`<img[^>]* src=\"${IMAGE_SRC}\"[^>]*>`, 'g'), '');

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                description: {
                    text: newDescription,
                    imagesSrc: IMAGES_SRCS
                }
            }
        }
    };
}