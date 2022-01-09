import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducers
import UserReducer from "./reducers/UserReducer/UserReducer";
import FileReducer from "./reducers/FileReducer/FileReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    file: FileReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

// Получаем ТИП rootReducer через нативную функцию typeScript ReturnType
export type RootState = ReturnType<typeof rootReducer>;

// Получаем ТИП setupStore через нативную функцию typeScript ReturnType
export type AppStore = ReturnType<typeof setupStore>;

// Получаем тип dispatcha-а
export type AppDispatch = AppStore["dispatch"];
