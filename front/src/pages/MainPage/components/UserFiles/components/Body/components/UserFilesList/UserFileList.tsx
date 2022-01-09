import React from "react";

// Redux
import { useTypedSelector } from "../../../../../../../../hooks/useTypedSelector";

// Components
import { UserFileItem } from "../UserFileItem/UserFileItem";

export const UserFileList: React.FC = () => {
    // **Redux state
    const { files } = useTypedSelector((state) => state.file);

    return (
        <ul className="user-files__list">
            {files.length > 0 ? (
                files.map((file) => <UserFileItem key={file.id} file={file} />)
            ) : (
                <li className="file-item file-item--empty">Пусто</li>
            )}
        </ul>
    );
};
