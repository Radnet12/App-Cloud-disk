import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

// Libs
import { BrowserRouter } from "react-router-dom";

// Components
import { App } from "./App";

// Styles
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
