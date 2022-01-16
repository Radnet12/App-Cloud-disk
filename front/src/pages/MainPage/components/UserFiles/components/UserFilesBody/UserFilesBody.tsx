import React, { useEffect } from "react";

// Redux
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { useDispatchedAction } from "../../../../../../hooks/useDispatchedActions";

// Components
import { Loader } from "../../../../../../components/ui/Loader/Loader";
import { UserFileList } from "./components/UserFilesList/UserFileList";

export const UserFilesBody: React.FC = () => {
    // **Redux state
    const { currentDir, files, sortType } = useTypedSelector(
        (state) => state.file
    );

    // Dispatch
    const { getFiles } = useDispatchedAction();

    useEffect(() => {
        getFiles({ folderId: currentDir, sortType });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDir, sortType]);

    return (
        <div className="user-files__body">
            {files.isLoading ? <Loader /> : <UserFileList />}
        </div>
    );
};
