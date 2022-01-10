import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import { FileService } from "../../../services/FileService";

// Types
import { FileType } from "./FileReducerTypes";

export const getFiles = createAsyncThunk(
    "file/getFiles",
    async (folderId: string | null, { rejectWithValue }) => {
        try {
            const response = await FileService.getFiles(folderId);

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при получении файлов: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const createDir = createAsyncThunk(
    "file/createDir",
    async (
        { name, parent, type }: Pick<FileType, "name" | "type" | "parent">,
        { rejectWithValue }
    ) => {
        try {
            const response = await FileService.createDir(name, parent, type);

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при создании директории: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);
