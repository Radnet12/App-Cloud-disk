// Libs
import { AxiosResponse } from "axios";

// Types
import { FileType } from "../store/reducers/FileReducer/FileReducerTypes";

// API
import { $api } from "./AxiosInstance";

export class FileService {
    static getFiles(
        folderId: string | null
    ): Promise<AxiosResponse<FileType[]>> {
        return $api.get("/files", { params: { id: folderId } });
    }

    static createDir(name: string, parent: string | null, type = "dir"): Promise<AxiosResponse<FileType>> {
        return $api.post("/files/create", {
            name,
            parent,
            type
        });
    }
}