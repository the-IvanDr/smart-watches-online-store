import { Provider } from 'react-redux';
import store from '../src/redux/store.js';

import '../src/styles/normalize.css';
import 'react-phone-number-input/style.css';
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