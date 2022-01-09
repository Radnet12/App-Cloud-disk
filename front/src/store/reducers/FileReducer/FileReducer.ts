import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { FileReducerState, FileType } from "./FileReducerTypes";

// Thunks
import { getFiles } from "./FileReducerThunk";

const initialState: FileReducerState = {
    files: [],
    isLoading: false,
    isFetchError: null,
    currentDir: null
};

const FileReducer = createSlice({
    name: "file",
    initialState,
    reducers: {},
    extraReducers: {
        [getFiles.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getFiles.fulfilled.type]: (
            state,
            action: PayloadAction<FileType[]>
        ) => {
            state.isFetchError = null;
            state.files = action.payload;
            state.isLoading = false;
        },
        [getFiles.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isFetchError = action.payload;
            state.isLoading = false;
        },
    },
});

export const FileReducerActions = { ...FileReducer.actions, getFiles };
export default FileReducer.reducer;
