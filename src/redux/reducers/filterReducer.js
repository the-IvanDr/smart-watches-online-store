import * as types from '../types.js';

const initialState = {
    typeId: 1, // 1 - wathces | 2 - strap
    character: null,
    icons: {
        novelty: false,
        hit: false
    },
    price: {
        max: null,
        min: null
    },
    presents: null,
    brands: [],
    sort: [
        { title: 'по популярности', name: 'popularity', active: true },
        { title: 'сначала дешевле', name: 'cheaper-first', active: false },
        { title: 'по названию', name: 'by-name', active: false },
    ]
};

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case types.FILTER_CHANGE_FIELD:
            return FILTER_CHANGE_FIELD_Handler(state, action);


        default: return state;
    }
}


const FILTER_CHANGE_FIELD_Handler = (state, action) => {
    console.log('FILTER_CHANGE_FIELD', action.payload);

    const FIELD_NAME = action.payload.field;
    const FIELD_VALUE = action.payload.value;

    return {
        ...state,
        [FIELD_NAME]: FIELD_VALUE
    }
}