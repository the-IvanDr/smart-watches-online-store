import * as types from '../types';
import * as APIQuery from '../../utils/APIQuery';

export const changeField = (field, value) => {
    return {
        type: types.FILTER_CHANGE_FIELD,
        payload: { field, value }
    }
}