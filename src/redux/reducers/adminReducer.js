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
        tabs: {
            list: true,
            createForm: false,
            view: false
        },
        view: null,
        list: [],
        createForm: {
            mainImageSrc: '',
            title: '',
            price: 0,
            discount: 0,
            article: '',
            types: [{ active: true, name: 'Нет типов. Создайте' }],
            brands: [{ active: true, name: 'Нет брендов. Создайте' }],
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
        tabs: {
            list: true,
            createForm: false,
            view: false
        },
        view: null,
        list: [],
        createForm: {
            photo: '',
            name: ''
        },
    },

    types: {
        tabs: {
            list: true,
            createForm: false,
            view: false
        },
        view: null,
        list: [],
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
        case types.ADMIN_PRODUCTS_GET_LIST:
            return ADMIN_PRODUCTS_GET_LIST_Handler(state, action);

        case types.ADMIN_PRODUCTS_TABS_CREATOR:
            return ADMIN_PRODUCTS_TABS_CREATOR_Handler(state, action);

        case types.ADMIN_PRODUCTS_TABS_LIST:
            return ADMIN_PRODUCTS_TABS_LIST_Handler(state, action);

        case types.ADMIN_PRODUCTS_TABS_VIEW:
            return ADMIN_PRODUCTS_TABS_VIEW_Handler(state, action);

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

        case types.ADMIN_PRODUCTS_GET_BRANDS_AND_TYPES:
            return ADMIN_PRODUCTS_GET_BRANDS_AND_TYPES_Handler(state, action);

        case types.ADMIN_PRODUCTS_CREATE:
            return ADMIN_PRODUCTS_CREATE_Handler(state, action);

        // BRANDS
        case types.ADMIN_BRANDS_GET_LIST:
            return ADMIN_BRANDS_GET_LIST_Handler(state, action);

        case types.ADMIN_BRANDS_TABS_SELECT:
            return ADMIN_BRANDS_TABS_SELECT_Handler(state, action);

        case types.ADMIN_BRANDS_TABS_CREATOR:
            return ADMIN_BRANDS_TABS_CREATOR_Handler(state, action);

        case types.ADMIN_BRANDS_TABS_LIST:
            return ADMIN_BRANDS_TABS_LIST_Handler(state, action);

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

        case types.ADMIN_TYPES_TABS_SELECT:
            return ADMIN_TYPES_TABS_SELECT_Handler(state, action);

        case types.ADMIN_TYPES_TABS_CREATOR:
            return ADMIN_TYPES_TABS_CREATOR_Handler(state, action);

        case types.ADMIN_TYPES_TABS_LIST:
            return ADMIN_TYPES_TABS_LIST_Handler(state, action);

        case types.ADMIN_TYPES_GET_LIST:
            return ADMIN_TYPES_GET_LIST_Handler(state, action);

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
const ADMIN_PRODUCTS_GET_LIST_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_GET_LIST', action.payload);

    const PRODUCTS = action.payload.products;

    return {
        ...state,
        products: {
            ...state.products,
            list: PRODUCTS
        }
    };
}

const ADMIN_PRODUCTS_TABS_CREATOR_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_TABS_CREATOR');

    const TABS = {
        list: false,
        createForm: true,
        view: false
    };

    return {
        ...state,
        products: {
            ...state.products,
            tabs: TABS
        }
    }
}

const ADMIN_PRODUCTS_TABS_LIST_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_TABS_LIST');

    const TABS = {
        list: true,
        createForm: false,
        view: false
    };

    return {
        ...state,
        products: {
            ...state.products,
            tabs: TABS
        }
    };
}

const ADMIN_PRODUCTS_TABS_VIEW_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_TABS_VIEW', action.payload);

    const PRODUCT_ID = action.payload.productId;
    const TABS = {
        list: false,
        createForm: false,
        view: true
    };

    return {
        ...state,
        products: {
            ...state.products,
            view: PRODUCT_ID,
            tabs: TABS
        }
    }
}

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

const ADMIN_PRODUCTS_GET_BRANDS_AND_TYPES_Handler = (state, action) => {
    console.log('ADMIN_PRODUCTS_GET_BRANDS_AND_TYPES', action.payload);

    const DEFAULT_ACTIVE_INDEX = 0;

    const BRANDS = action.payload.brands.map((brand, index) => {
        return {
            active: index === DEFAULT_ACTIVE_INDEX,
            name: brand.name,
            id: brand.id,
        }
    });

    const TYPES = action.payload.types.map((type, index) => {
        return {
            active: index === DEFAULT_ACTIVE_INDEX,
            name: type.name,
            id: type.id
        }
    });

    return {
        ...state,
        products: {
            ...state.products,
            createForm: {
                ...state.products.createForm,
                brands: BRANDS.length > 0 ? BRANDS : state.products.createForm.brands,
                types: TYPES.length > 0 ? TYPES : state.products.createForm.types
            }
        }
    };
}

const ADMIN_PRODUCTS_CREATE_Handler = (state) => {
    console.log('ADMIN_PRODUCTS_CREATE');

    return state;
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

    const TABS = {
        list: true,
        createForm: false,
        view: false
    };

    const FORM = {
        name: '',
        photo: ''
    }

    return {
        ...state,
        brands: {
            ...state.brands,
            createForm: FORM,
            tabs: TABS
        }
    };
}

const ADMIN_BRANDS_GET_LIST_Handler = (state, action) => {
    console.log('ADMIN_BRANDS_GET_LIST', action.payload);

    const BRAND_LIST = action.payload.brands;

    return {
        ...state,
        brands: {
            ...state.brands,
            list: BRAND_LIST
        }
    };
}

const ADMIN_BRANDS_TABS_SELECT_Handler = (state, action) => {
    console.log('ADMIN_BRANDS_TABS_SELECT', action.payload);

    const BRAND_ID = action.payload.brandId;
    const TABS = {
        list: false,
        createForm: false,
        view: true
    };

    return {
        ...state,
        brands: {
            ...state.brands,
            tabs: TABS,
            view: BRAND_ID
        }
    }
}

const ADMIN_BRANDS_TABS_CREATOR_Handler = (state, action) => {
    console.log('ADMIN_BRANDS_TABS_CREATOR');

    const TABS = {
        list: false,
        createForm: true,
        view: false
    }

    return {
        ...state,
        brands: {
            ...state.brands,
            tabs: TABS,
        }
    }
}

const ADMIN_BRANDS_TABS_LIST_Handler = (state, action) => {
    console.log('ADMIN_BRANDS_TABS_LIST');

    const TABS = {
        list: true,
        createForm: false,
        view: false
    }

    return {
        ...state,
        brands: {
            ...state.brands,
            tabs: TABS
        }
    }
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

const ADMIN_TYPES_GET_LIST_Handler = (state, action) => {
    console.log('ADMIN_TYPES_GET_LIST', action.payload);

    const TYPES_LIST = action.payload.list;

    return {
        ...state,
        types: {
            ...state.types,
            list: TYPES_LIST
        }
    };
}

const ADMIN_TYPES_TABS_CREATOR_Handler = (state, action) => {
    console.log('ADMIN_TYPES_TABS_CREATOR');

    const TABS = {
        list: false,
        createForm: true,
        view: false
    }

    return {
        ...state,
        types: {
            ...state.types,
            tabs: TABS
        }
    };
}

const ADMIN_TYPES_TABS_SELECT_Handler = (state, action) => {
    console.log('ADMIN_TYPES_TABS_SELECT', action.payload);

    const TYPE_ID = action.payload.typeId;
    const TABS = {
        list: false,
        createForm: false,
        view: true
    }

    return {
        ...state,
        types: {
            ...state.types,
            tabs: TABS,
            view: TYPE_ID
        }
    };
}

const ADMIN_TYPES_TABS_LIST_Handler = (state, action) => {
    console.log('ADMIN_TYPES_TABS_LIST');

    const TABS = {
        list: true,
        createForm: false,
        view: false
    };

    return {
        ...state,
        types: {
            ...state.types,
            tabs: TABS,
            view: null
        }
    };
}

const ADMIN_TYPES_CREATE_Handler = (state, action) => {
    console.log('ADMIN_TYPES_CREATE');

    const TABS = {
        list: true,
        createForm: false,
        view: false
    };

    const FORM = {
        name: ''
    }

    return {
        ...state,
        types: {
            ...state.types,
            createForm: FORM,
            tabs: TABS
        }
    };
}