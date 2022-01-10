import React, { useState } from "react";

// Redux
import { useDispatchedAction } from "../../../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

// Components
import { Return } from "../../../../components/ui/Return/Return";
import { Modal } from "../../../../components/common/Modal/Modal";

// Styles
import "./FilesHeader.scss";
import { Input } from "../../../../components/ui/Input/Input";

export const FilesHeader: React.FC = () => {
    // **Redux state
    const { currentDir } = useTypedSelector((state) => state.file);

    // **Local state
    const [isModalVisible, setIsModalVisile] = useState<boolean>(false);

    // Dispatch
    const { createDir } = useDispatchedAction();

    const createDirHandler = () => {
        createDir({ name: "апавпвап", parent: currentDir, type: "dir" });
    };

    return (
        <>
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
                        onClick={() => setIsModalVisile(true)}
                    >
                        Создать новую папку
                    </button>
                </div>
                <div className="files-header__right"></div>
            </div>
            <Modal
                title="Создание папки"
                footer
                footerCancelBtnText="Отменить создание"
                footerSubmitBtnText="Создать папку"
                visible={isModalVisible}
                closeHandler={setIsModalVisile}
            >
                <div className="files-header__modal">
                    <Input placeholder="Название папки..." />
                </div>
            </Modal>
        </>
    );
};
