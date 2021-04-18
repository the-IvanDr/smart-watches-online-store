import { combineReducers } from 'redux';

import accountReducer from './authReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    auth: accountReducer,
    admin: adminReducer
});