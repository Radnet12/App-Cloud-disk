import React from "react";

// Components
import { Return } from "../../../../components/ui/Return/Return";

// Styles
import "./FilesHeader.scss";

export const FilesHeader: React.FC = () => {
    return (
        <div className="files-header">
            <div className="files-header__left">
                <Return
                    color="var(--clr-default-100)"
                    hoverColor="var(--clr-secondary-400)"
                />
                <button
                    className="files-header__btn"
                    style={
                        {
                            "--color": "var(--clr-default-100)",
                            "--hoverColor": "var(--clr-secondary-400)",
                        } as React.CSSProperties
                    }
                >
                    Создать новую папку
                </button>
            </div>
            <div className="files-header__right"></div>
        </div>
    );
};
