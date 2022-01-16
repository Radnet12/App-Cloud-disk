export type UploadFileType = {
    id: string;
    name: string;
    progress: number;
};

export type UploadReducerState = {
    files: UploadFileType[];
};
