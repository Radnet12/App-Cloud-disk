// Libs
import { AxiosResponse } from "axios";

// Types
import { FileType } from "../store/reducers/FileReducer/FileReducerTypes";

// API
import { $api } from "./AxiosInstance";

export class FileService {
    static getFiles(
        folderId: string | null,
        sortType: string | null
    ): Promise<AxiosResponse<FileType[]>> {
        return $api.get("/files", { params: { id: folderId, sort: sortType } });
    }

    static createDir(
        name: string,
        parent: string | null,
        type = "dir"
    ): Promise<AxiosResponse<FileType>> {
        return $api.post("/files/create", {
            name,
            parent,
            type,
        });
    }

    static fileUpload(
        file: File,
        parent: string | null,
        progressHandler: (progress: number) => void
    ): Promise<AxiosResponse<FileType>> {
        let formData = new FormData();

        formData.append("file", file);
        if (parent) {
            formData.append("parent", parent);
        }

        return $api.post("/files/upload", formData, {
            onUploadProgress: (progressEvent: any) => {
                const totalLength: number = progressEvent.lengthComputable
                    ? progressEvent.total
                    : progressEvent.target.getResponseHeader(
                          "content-length"
                      ) ||
                      progressEvent.target.getResponseHeader(
                          "x-decompressed-content-length"
                      );

                if (totalLength) {
                    let progress = Math.round(
                        (progressEvent.loaded * 100) / totalLength
                    );
                    progressHandler(progress);
                }
            },
        });
    }

    static fileDownload(id: string): Promise<AxiosResponse<Blob>> {
        return $api.get("/files/download", {
            params: { id },
            responseType: "blob",
        });
    }

    static fileDelete(id: string): Promise<AxiosResponse<FileType>> {
        return $api.delete("/files/delete", {
            params: { id },
        });
    }
}
