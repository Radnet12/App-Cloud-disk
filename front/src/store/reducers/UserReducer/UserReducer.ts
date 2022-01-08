import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { UserReducerState, UserType } from "./UserReducerTypes";
import { AuthResponse } from "../../../models/AuthResponse";

// Thunks
import { registration, login, authorization } from "./UserReducerThunk";

const initialState: UserReducerState = {
    user: {} as UserType,
    isAuth: false,
    isFetchError: null,
    isLoading: false,
};

const UserReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");

            state.user = {} as UserType;
            state.isAuth = false;
        },
    },
    extraReducers: {
        [registration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled.type]: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            localStorage.setItem("token", action.payload.token);
            state.user = action.payload.user;
            state.isAuth = true;
            state.isFetchError = null;
            state.isLoading = false;
        },
        [registration.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isFetchError = action.payload;
            state.isLoading = false;
        },

        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            localStorage.setItem("token", action.payload.token);
            state.user = action.payload.user;
            state.isAuth = true;
            state.isFetchError = null;
            state.isLoading = false;
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetchError = action.payload;
            state.isLoading = false;
        },

        [authorization.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authorization.fulfilled.type]: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            localStorage.setItem("token", action.payload.token);
            state.user = action.payload.user;
            state.isAuth = true;
            state.isFetchError = null;
            state.isLoading = false;
        },
        [authorization.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            localStorage.removeItem("token");
            state.isFetchError = action.payload;
            state.isLoading = false;
        },
    },
});

export const UserReducerActions = {
    ...UserReducer.actions,
    registration,
    login,
    authorization,
};
export default UserReducer.reducer;
