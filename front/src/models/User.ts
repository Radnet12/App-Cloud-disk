export interface User {
    id: string;
    email: string;
    diskSpace: number;
    usedSpace: number;
    avatar: string;
    files: string[];
};