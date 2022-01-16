import React from "react";

// Types
import { UploadFileType } from "../../../store/reducers/UploadReducer/UploadReducerTypes";

// Styles
import "./UploadContainer.scss";

type UploadContainerProps = {
    file: UploadFileType;
};

export const UploadContainer: React.FC<UploadContainerProps> = (props) => {
    // **Props
    const { file } = props;

    return (
        <div className="upload-container">
            <div>
                Файл: <span>{file.name}</span>.
            </div>
            <div>
                Загружено: <span>{file.progress}</span>%
            </div>
        </div>
    );
};
