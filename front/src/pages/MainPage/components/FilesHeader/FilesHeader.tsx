import React from "react";

// Redux
import { useDispatchedAction } from "../../../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

// Components
import { Return } from "../../../../components/ui/Return/Return";

// Styles
import "./FilesHeader.scss";

export const FilesHeader: React.FC = () => {
    // **Redux
    const { currentDir } = useTypedSelector((state) => state.file);

    // Dispatch
    const { createDir } = useDispatchedAction();

    const createDirHandler = () => {
        createDir({ name: "апавпвап", parent: currentDir, type: "dir" });
    };

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
                    onClick={createDirHandler}
                >
                    Создать новую папку
                </button>
            </div>
            <div className="files-header__right"></div>
        </div>
    );
};
