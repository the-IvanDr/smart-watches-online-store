import { combineReducers } from 'redux';

import accountReducer from './authReducer';

export default combineReducers({
    auth: accountReducer,
});