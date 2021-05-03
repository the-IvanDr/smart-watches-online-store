import { combineReducers } from 'redux';

import accountReducer from './authReducer';
import adminReducer from './adminReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    auth: accountReducer,
    admin: adminReducer,
    filter: filterReducer
});