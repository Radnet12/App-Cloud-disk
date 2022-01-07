import { createSlice } from "@reduxjs/toolkit";

// Types
import { UserReducerState, UserType } from "./UserReducerTypes";

const initialState: UserReducerState = {
    user: {} as UserType,
    isAuth: false,
};

const UserReducer = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const UserReducerActions = { ...UserReducer.actions };
export default UserReducer.reducer;
