import React from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import {I18nextProvider} from "react-i18next";
import "antd/dist/antd.min.css";
import Router from "./router";
import i18n from "./translation";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/stores";

const App = (): JSX.Element => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
