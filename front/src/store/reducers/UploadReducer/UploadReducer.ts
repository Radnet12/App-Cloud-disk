import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { UploadFileType, UploadReducerState } from "./UploadReducerTypes";

const initialState: UploadReducerState = {
    files: [],
};

const UploadReducer = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<UploadFileType>) => {
            state.files.push(action.payload);
        },
        deleteFile: (state, action: PayloadAction<UploadFileType>) => {
            state.files = state.files.filter(
                (file) => file.id !== action.payload.id
            );
        },
        changeProgress: (state, action: PayloadAction<UploadFileType>) => {
            state.files = state.files.map((file) => {
                if (file.id === action.payload.id) {
                    return {
                        ...file,
                        progress: action.payload.progress,
                    };
                } else {
                    return file;
                }
            });
        },
    },
});

export const UploadReducerActions = { ...UploadReducer.actions };
export default UploadReducer.reducer;
