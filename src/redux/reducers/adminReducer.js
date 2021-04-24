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
            mainImageSrc: '',
            title: '',
            price: 0,
            discount: 0,
            types: [
                {
                    name: 'Смарт-часы',
                    active: true
                },
                {
                    name: 'Ремень',
                    active: false
                }
            ],
            brands: [
                {
                    name: 'Xiaomi',
                    active: true
                },
                {
                    name: 'Huawei',
                    active: false
                },
                {
                    name: 'Apple',
                    active: false
                },
                {
                    name: 'Samsung',
                    active: false
                }
            ],
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
    },

    brands: {
        createForm: {
            photo: '',
            name: ''
        }
    },

    types: {
        createForm: {
            name: ''
        }
    }
}


export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADMIN_ERROR_ALERT:
            return ADMIN_ERROR_ALERT_Handler(state, action);

        case types.ADMIN_HEADER_CHANGE_TAB:
            return ADMIN_HEADER_CHANGE_TAB_Handler(state, action);

        // PRODUCTS
        case types.ADMIN_PRODUCTS_UPLOAD_PRODUCT_IMAGE:
            return ADMIN_PRODUCTS_UPLOAD_PRODUCT_IMAGE_Handler(state, action);

        case types.ADMIN_PRODUCTS_REMOVE_PRODUCT_IMAGE:
            return ADMIN_PRODUCTS_REMOVE_PRODUCT_IMAGE_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_CHANGE:
            return ADMIN_PRODUCTS_FORM_CHANGE_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES:
            return ADMIN_PRODUCTS_FORM_DESCRIPTION_UPLOAD_IMAGES_Handler(state, action);

        case types.ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES:
            return ADMIN_PRODUCTS_FORM_DESCRIPTION_REMOVE_IMAGES_Handler(state, action);

        // BRANDS
        case types.ADMIN_BRANDS_FORM_CHANGE:
            return ADMIN_BRANDS_FORM_CHANGE_Handler(state, action);

        case types.ADMIN_BRANDS_UPLOAD_IMAGE:
            return ADMIN_BRANDS_UPLOAD_IMAGE_Handler(state, action);

        case types.ADMIN_BRANDS_REMOVE_IMAGE:
            return ADMIN_BRANDS_REMOVE_IMAGE_Handler(state, action);

        case types.ADMIN_BRANDS_CREATE:
            return ADMIN_BRANDS_CREATE_Handler(state, action);

        // TYPES
        case types.ADMIN_TYPES_FORM_CHANGE:
            return ADMIN_TYPES_FORM_CHANGE_Handler(state, action);

        case types.ADMIN_TYPES_CREATE:
            return ADMIN_TYPES_CREATE_Handler(state, action);

        default: return state;
    }
}

const ADMIN_ERROR_ALERT_Handler = (state, action) => {
    console.log('ADMIN_ERROR_ALERT', action.payload);

    const ERROR = action.payload.error;
    const MESSAGE = action.payload.message;

    if (ERROR) console.log("Error: ", ERROR.message);
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

//===================== PRODUCTS =============================\\
const ADMIN_PRODUCTS_UPLOAD_PRODUCT_IMAGE_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_UPLOAD_PRODUCT_IMAGE', action.payload);

    const IMG_SRC = action.payload.src;

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                mainImageSrc: IMG_SRC
            }
        }
    }
}

const ADMIN_PRODUCTS_REMOVE_PRODUCT_IMAGE_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_REMOVE_PRODUCT_IMAGE');

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                mainImageSrc: ''
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

//===================== BRANDS =============================\\
const ADMIN_BRANDS_FORM_CHANGE_Handler = (state, action) => {
    console.log('ADMIN_BRANDS_FORM_CHANGE', action.payload);

    const FIELD_NAME = action.payload.field;
    const FIELD_VALUE = action.payload.value;

    return {
        ...state,
        brands: {
            ...state.brands,
            createForm: {
                ...state.brands.createForm,
                [FIELD_NAME]: FIELD_VALUE
            }
        }
    };
}

const ADMIN_BRANDS_UPLOAD_IMAGE_Handler = (state, action) => {
    console.log('ADMIN_BRANDS_UPLOAD_IMAGE', action.payload);

    const IMAGE_SRC = action.payload.src;

    return {
        ...state,
        brands: {
            ...state.brands,
            createForm: {
                ...state.brands.createForm,
                photo: IMAGE_SRC
            }
        }
    };
}

const ADMIN_BRANDS_REMOVE_IMAGE_Handler = (state) => {
    console.log('ADMIN_BRANDS_REMOVE_IMAGE');
    return {
        ...state,
        brands: {
            ...state.brands,
            createForm: {
                ...state.brands.createForm,
                photo: ''
            }
        }
    };
}

const ADMIN_BRANDS_CREATE_Handler = (state) => {
    console.log('ADMIN_BRANDS_CREATE');
    return state;
}

//===================== TYPES =============================\\
const ADMIN_TYPES_FORM_CHANGE_Handler = (state, action) => {
    console.log('ADMIN_TYPES_FORM_CHANGE', action.payload);

    const FIELD_NAME = action.payload.field;
    const FIELD_VALUE = action.payload.value;

    return {
        ...state,
        types: {
            ...state.types,
            createForm: {
                ...state.types.createForm,
                [FIELD_NAME]: FIELD_VALUE
            }
        }
    };
}

const ADMIN_TYPES_CREATE_Handler = (state, action) => {
    console.log('ADMIN_TYPES_CREATE');
    return state;
}