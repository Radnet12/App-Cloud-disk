import React from "react";

// Redux
import { useDispatchedAction } from "../../../../../../../../hooks/useDispatchedActions";

// Libs
import moment from "moment";

// Types
import { FileType } from "../../../../../../../../store/reducers/FileReducer/FileReducerTypes";

// Styles
import "./UserFileItem.scss";
import { useTypedSelector } from "../../../../../../../../hooks/useTypedSelector";

type UserFileItemProps = {
    file: FileType;
};

export const UserFileItem: React.FC<UserFileItemProps> = (props) => {
    // **Props
    const { file } = props;

    // **Redux state
    const { currentDir } = useTypedSelector((state) => state.file);

    // Dispatch
    const { setCurrentDir, pushToDirStack } = useDispatchedAction();

    const clickHandler = (): void => {
        if (file.type === "dir") {
            pushToDirStack(currentDir);
            setCurrentDir(file.id);
        }
    };

    return (
        <li className="file-item" onClick={clickHandler}>
            <div className="file-item__image">
                <img
                    src={
                        file.type === "dir"
                            ? "img/ui/dir.svg"
                            : "img/ui/file.svg"
                    }
                    width={48}
                    height={48}
                    loading="lazy"
                    alt={file.type === "dir" ? "Папка" : "Файл"}
                />
            </div>
            <div className="file-item__name">{file.name}</div>
            <div className="file-item__date">
                {moment(file.date).format("DD.MM.YYYY HH:MM:SS")}
            </div>
            <div className="file-item__size">{file.size}</div>
        </li>
    );
};
