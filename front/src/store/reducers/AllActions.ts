// Actions
import { FileReducerActions } from "./FileReducer/FileReducer";
import { UserReducerActions } from "./UserReducer/UserReducer";

export const AllActions = {
    ...UserReducerActions,
    ...FileReducerActions
};