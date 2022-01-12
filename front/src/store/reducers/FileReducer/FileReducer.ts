import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { FileReducerState, FileType } from "./FileReducerTypes";

// Thunks
import { getFiles, createDir } from "./FileReducerThunk";

const initialState: FileReducerState = {
    files: [],
    isLoading: false,
    isFetchError: null,
    currentDir: null,
    dirStack: [],
};

const FileReducer = createSlice({
    name: "file",
    initialState,
    reducers: {
        setCurrentDir: (state, action: PayloadAction<string | null>) => {
            state.currentDir = action.payload;
        },
        pushToDirStack: (state, action: PayloadAction<string | null>) => {
            state.dirStack.push(action.payload);
        },
        popFromDirStack: (state) => {
            state.dirStack.pop();
        },
    },
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
        [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetchError = action.payload;
            state.isLoading = false;
        },

        [createDir.fulfilled.type]: (
            state,
            action: PayloadAction<FileType>
        ) => {
            state.isFetchError = null;
            state.files = [...state.files, action.payload];
        },
        [createDir.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isFetchError = action.payload;
        },
    },
});

export const FileReducerActions = {
    ...FileReducer.actions,
    getFiles,
    createDir,
};
export default FileReducer.reducer;
