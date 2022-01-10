import React from "react";

// Libs
import moment from "moment";

// Types
import { FileType } from "../../../../../../../../store/reducers/FileReducer/FileReducerTypes";

// Styles
import "./UserFileItem.scss";

type UserFileItemProps = {
    file: FileType;
};

export const UserFileItem: React.FC<UserFileItemProps> = (props) => {
    // **Props
    const { file } = props;

    return (
        <li className="file-item">
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
            <div className="file-item__date">{moment(file.date).format("DD.MM.YYYY HH:MM:SS")}</div>
            <div className="file-item__size">{file.size}</div>
        </li>
    );
};
