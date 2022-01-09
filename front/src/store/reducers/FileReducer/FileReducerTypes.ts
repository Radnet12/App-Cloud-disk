export type FileType = {
    id: string;
    name: string;
    type: string;
    date: Date;
    accessLink: string;
    size: number;
    path: string;
    user: string;
    parent: string;
    children: string[]
};

export type FileReducerState = {
    files: FileType[];
    isLoading: boolean;
    isFetchError: string | null;
    currentDir: string | null;
};