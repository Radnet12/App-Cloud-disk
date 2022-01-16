// Actions
import { FileReducerActions } from "./FileReducer/FileReducer";
import { UploadReducerActions } from "./UploadReducer/UploadReducer";
import { UserReducerActions } from "./UserReducer/UserReducer";

export const AllActions = {
    ...UploadReducerActions,
    ...UserReducerActions,
    ...FileReducerActions,
};
