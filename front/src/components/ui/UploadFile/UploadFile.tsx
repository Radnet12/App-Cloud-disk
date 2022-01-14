import React, { CSSProperties, InputHTMLAttributes } from "react";

// Styles
import "./UploadFile.scss";

type UploadFileProps = {
    labelText?: string;
    wrapperStyle?: CSSProperties;
} & InputHTMLAttributes<HTMLInputElement>;

export const UploadFile: React.FC<UploadFileProps> = (props) => {
    // **Props
    const { labelText, wrapperStyle, ...rest } = props;

    return (
        <div className="file-upload" style={wrapperStyle}>
            <label>
                {labelText && <span>{labelText}</span>}
                <input type="file" {...rest} />
            </label>
        </div>
    );
};
