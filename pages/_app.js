// import React from 'react';
// import App from 'next/app';
import { Provider } from 'react-redux';
// import { createWrapper } from 'next-redux-wrapper';
import store from '../src/redux/store.js';

import '../src/styles/normalize.css';
import '../src/styles/fonts.css';
import '../src/styles/main.scss';

// IF YOU ARE HERE ! DELETE ALL COMMENTS AND REMOVE THE "NEXT_REDUX_WRAPPER POCKET FROM NPM DEPENDECIES"

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp;

// class MyApp extends App {
//     render() {
//         const { Component, pageProps } = this.props;
//         return (
//             <Provider store={store}>
//                 <Component {...pageProps}></Component>
//             </Provider>
//         )
//     }
// }

// const makestore = () => store;
// const wrapper = createWrapper(makestore);
// export default wrapper.withRedux(MyApp);
