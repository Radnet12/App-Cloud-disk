import { createAsyncThunk } from "@reduxjs/toolkit";


// API
import { FileService } from "../../../services/FileService";

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
            console.log("Ошибка при регистрации: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);