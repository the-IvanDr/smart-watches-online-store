import * as types from '../types.js';

// export const fetchposts = () => async dispatch => {
//     dispatch({
//         type: types.GET_POSTS,
//         payload: ['1st post', '2nd post', '3 post']
//     });
// }

// export const fetchposts = () => {
//     return {
//         type: types.GET_POSTS,
//         payload: ['1st post', '2nd post', '3 post']
//     }
// }

export const login = () => async dispatch => {
    dispatch({
        type: types.AUTH_LOGIN,
        payload: {}
    });
}