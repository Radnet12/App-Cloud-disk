import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { FileReducerState, FileType } from "./FileReducerTypes";

// Thunks
import {
    getFiles,
    createDir,
    uploadFile,
    downloadFile,
    deleteFile,
} from "./FileReducerThunk";

const initialState: FileReducerState = {
    sortType: null,
    currentDir: null,
    dirStack: [],
    files: {
        files: [],
        isLoading: false,
        isError: null,
    },
    remove: {
        isInProcess: false,
        isError: null,
    },
    download: {
        isInProcess: false,
        isError: null,
    },
    upload: {
        isInProcess: false,
        isError: null,
    },
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
        setSortType: (state, action: PayloadAction<string | null>) => {
            state.sortType = action.payload;
        },
    },
    extraReducers: {
        [getFiles.pending.type]: (state) => {
            state.files.isLoading = true;
        },
        [getFiles.fulfilled.type]: (
            state,
            action: PayloadAction<FileType[]>
        ) => {
            state.files.isError = null;
            state.files.files = action.payload;
            state.files.isLoading = false;
        },
        [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
            state.files.isError = action.payload;
            state.files.isLoading = false;
        },

        [createDir.fulfilled.type]: (
            state,
            action: PayloadAction<FileType>
        ) => {
            state.files.isError = null;
            state.files.files = [...state.files.files, action.payload];
        },
        [createDir.rejected.type]: (state, action: PayloadAction<string>) => {
            state.files.isError = action.payload;
        },

        [uploadFile.pending.type]: (state) => {
            state.upload.isInProcess = true;
        },
        [uploadFile.fulfilled.type]: (
            state,
            action: PayloadAction<FileType>
        ) => {
            state.upload.isError = null;
            state.files.files.push(action.payload);
            state.upload.isInProcess = false;
        },
        [uploadFile.rejected.type]: (state, action: PayloadAction<string>) => {
            state.upload.isError = action.payload;
            state.upload.isInProcess = false;
        },

        [downloadFile.pending.type]: (state) => {
            state.download.isInProcess = true;
        },
        [downloadFile.fulfilled.type]: (state) => {
            state.download.isError = null;
            state.download.isInProcess = false;
        },
        [downloadFile.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.download.isError = action.payload;
            state.download.isInProcess = false;
        },

        [deleteFile.pending.type]: (state) => {
            state.remove.isInProcess = true;
        },
        [deleteFile.fulfilled.type]: (
            state,
            action: PayloadAction<FileType>
        ) => {
            state.remove.isError = null;
            state.files.files = state.files.files.filter(
                (file) => file.id !== action.payload.id
            );
            state.remove.isInProcess = false;
        },
        [deleteFile.rejected.type]: (state, action: PayloadAction<string>) => {
            state.remove.isError = action.payload;
            state.remove.isInProcess = false;
        },
    },
});

export const FileReducerActions = {
    ...FileReducer.actions,
    getFiles,
    createDir,
    uploadFile,
    downloadFile,
    deleteFile,
};
export default FileReducer.reducer;
