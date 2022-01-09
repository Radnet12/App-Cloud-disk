import React, { useEffect } from "react";

// Redux
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { useDispatchedAction } from "../../../../../../hooks/useDispatchedActions";

// Components
import { Loader } from "../../../../../../components/ui/Loader/Loader";
import { UserFileList } from "./components/UserFilesList/UserFileList";

export const Body: React.FC = () => {
    // **Redux state
    const { currentDir, isLoading } = useTypedSelector(
        (state) => state.file
    );

    // Dispatch
    const { getFiles } = useDispatchedAction();

    useEffect(() => {
        getFiles(currentDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDir]);

    return (
        <div className="user-files__body">
            {isLoading ? <Loader /> : <UserFileList />}
        </div>
    );
};
