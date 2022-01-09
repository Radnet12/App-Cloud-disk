import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

// Libs
import { BrowserRouter } from "react-router-dom";

// Components
import { App } from "./App";
import { Loader } from "./components/ui/Loader/Loader";

// Styles
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <Suspense fallback={<Loader fixed/>}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
