import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { FormAuth } from "../../../models/FormAuth";

// API
import { AuthService } from "../../../services/AuthService";
import { FileService } from "../../../services/FileService";

export const registration = createAsyncThunk(
    "user/registerUser",
    async ({ email, password }: FormAuth, { rejectWithValue }) => {
        try {
            const response = await AuthService.registration(email, password);

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


export const login = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }: FormAuth, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(email, password);

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при авторизации: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);


export const authorization = createAsyncThunk(
    "user/authUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.authorization();

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при авторизации через токен: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    "user/uploadAvatar",
    async (file: File, { rejectWithValue }) => {
        try {
            const response = await FileService.uploadAvatar(file);

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при загрузки изображения: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const deleteAvatar = createAsyncThunk(
    "user/deleteAvatar",
    async (_, { rejectWithValue }) => {
        try {
            const response = await FileService.deleteAvatar();

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при удалении изображения: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);