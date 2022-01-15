export type UploadFileType = {
    file: File;
    parent: string | null;
};

export type FileType = {
    id: string;
    name: string;
    type: string;
    date: Date;
    accessLink: string;
    size: number;
    path: string;
    user: string;
    parent: string | null;
    children: string[];
};

export type FileReducerState = {
    files: FileType[];
    isLoading: boolean;
    isFileDeleting: boolean;
    isFileDeletingError: string | null;
    isFileDownloading: boolean;
    isFileDownloadingError: string | null;
    isFileUploading: boolean;
    isFileUploadError: string | null;
    isFetchError: string | null;
    currentDir: string | null;
    dirStack: Array<string | null>;
};
