import { createAsyncThunk } from "@reduxjs/toolkit";

// Redux
import { UploadReducerActions } from "../UploadReducer/UploadReducer";

// API
import { FileService } from "../../../services/FileService";

// Types
import { FileType, GetFilesArgsType, UploadFileType } from "./FileReducerTypes";

// Utils
import { createId } from "../../../utils/createId";

export const getFiles = createAsyncThunk(
    "file/getFiles",
    async ({ folderId, sortType }: GetFilesArgsType, { rejectWithValue }) => {
        try {
            const response = await FileService.getFiles(folderId, sortType);

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

export const uploadFile = createAsyncThunk(
    "file/uploadFile",
    async ({ file, parent }: UploadFileType, { rejectWithValue, dispatch }) => {
        try {
            const uploadedFile = {
                id: createId(),
                name: file.name,
                progress: 0,
            };

            dispatch(UploadReducerActions.setFile(uploadedFile));

            const calculateProgress = (progress: number) => {
                dispatch(
                    UploadReducerActions.changeProgress({
                        ...uploadedFile,
                        progress,
                    })
                );

                if (progress >= 100) {
                    dispatch(UploadReducerActions.deleteFile(uploadedFile));
                }
            };

            const response = await FileService.fileUpload(
                file,
                parent,
                calculateProgress
            );

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при загрузке файла: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const downloadFile = createAsyncThunk(
    "file/downloadFile",
    async (file: FileType, { rejectWithValue }) => {
        try {
            const response = await FileService.fileDownload(file.id);

            if (response.status !== 200) {
                throw response;
            }

            const downloadUrl = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();

            return true;
        } catch (e: any) {
            console.log("Ошибка при скачивании файла: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const deleteFile = createAsyncThunk(
    "file/deleteFile",
    async (fileId: string, { rejectWithValue }) => {
        try {
            const response = await FileService.fileDelete(fileId);

            if (response.status !== 200) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            console.log("Ошибка при удалении файла: ", e.response);
            return rejectWithValue(e.response?.data?.message);
        }
    }
);
