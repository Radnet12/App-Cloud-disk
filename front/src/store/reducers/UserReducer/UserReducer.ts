import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { UserReducerState, UserType } from "./UserReducerTypes";
import { AuthResponse } from "../../../models/AuthResponse";

// Thunks
import { registration, login, authorization, uploadAvatar, deleteAvatar } from "./UserReducerThunk";

const initialState: UserReducerState = {
    user: {} as UserType,
    isAuth: false,
    isFetchError: null,
    isLoading: false,
    isAvatarLoading: false
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

        [uploadAvatar.pending.type]: (state) => {
            state.isAvatarLoading = true;
        },
        [uploadAvatar.fulfilled.type]: (
            state,
            action: PayloadAction<UserType>
        ) => {
            state.isFetchError = null;
            state.user = action.payload;
            state.isAvatarLoading = false;
        },
        [uploadAvatar.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isFetchError = action.payload;
            state.isAvatarLoading = false;
        },

        [deleteAvatar.pending.type]: (state) => {
            state.isAvatarLoading = true;
        },
        [deleteAvatar.fulfilled.type]: (
            state,
            action: PayloadAction<UserType>
        ) => {
            state.isFetchError = null;
            state.user = action.payload;
            state.isAvatarLoading = false;
        },
        [deleteAvatar.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isFetchError = action.payload;
            state.isAvatarLoading = false;
        },
    },
});

export const UserReducerActions = {
    ...UserReducer.actions,
    registration,
    login,
    authorization,
    uploadAvatar,
    deleteAvatar,
};
export default UserReducer.reducer;
