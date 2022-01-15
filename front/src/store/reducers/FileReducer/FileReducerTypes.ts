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

type fetchObject = {
    isInProcess: boolean;
    isError: string | null;
};

export type FileReducerState = {
    files: {
        files: FileType[];
        isLoading: boolean;
        isError: string | null;
    };
    remove: fetchObject;
    download: fetchObject;
    upload: fetchObject;
    currentDir: string | null;
    dirStack: Array<string | null>;
};
