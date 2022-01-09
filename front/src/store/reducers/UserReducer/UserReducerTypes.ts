export type UserType = {
    id: string;
    email: string;
    diskSpace: number;
    usedSpace: number;
    avatar: string;
};

export type UserReducerState = {
    user: UserType;
    isAuth: boolean;
    isFetchError: string | null;
    isLoading: boolean;
};
