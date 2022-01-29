import React from "react";

// Redux
import { useTypedSelector } from "../../../../../../../../hooks/useTypedSelector";

// Components
import { UserFileItem } from "../UserFileItem/UserFileItem";

export const UserFileList: React.FC = () => {
    // **Redux state
    const {
        files: { files },
        viewType,
    } = useTypedSelector((state) => state.file);


    return (
        <ul
            className={
                viewType === "plate"
                    ? "user-files__list user-files__list--plate"
                    : "user-files__list user-files__list--list"
            }
        >
            {files.length > 0 ? (
                files.map((file) => (
                    <UserFileItem
                        key={file.id}
                        file={file}
                        viewType={viewType}
                    />
                ))
            ) : (
                <li className="file-item file-item--empty">Пусто</li>
            )}
        </ul>
    );
};
