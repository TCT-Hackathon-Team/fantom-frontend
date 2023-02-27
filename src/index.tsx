import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import ReactDOM from 'react-dom/client';
import {I18nextProvider} from "react-i18next";
import "antd/dist/antd.min.css";

import Router from "./router";
import i18n from "./translation";
import React from "react";
import {Provider} from 'react-redux'
import {store} from "./stores";

// // Load ENV variables
// dotEnvConfig({
//     path:
//         process.env.NODE_ENV === 'production'
//             ? '.env.production'
//             : '.env.development',
// });

const App = () => (
    <BrowserRouter>
        <I18nextProvider i18n={i18n}>
            <Router/>
        </I18nextProvider>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);