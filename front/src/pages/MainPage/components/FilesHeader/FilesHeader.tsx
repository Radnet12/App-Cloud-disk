import React, { useRef, useState } from "react";

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
    const { currentDir, dirStack } = useTypedSelector((state) => state.file);

    // **Local state
    const [isModalVisible, setIsModalVisile] = useState<boolean>(false);

    // **Ref
    const inputRef = useRef<HTMLInputElement>(null!);

    // Dispatch
    const { createDir, popFromDirStack, setCurrentDir } = useDispatchedAction();

    const createDirHandler = (): void => {
        if (inputRef.current?.value.length > 0) {
            createDir({
                name: inputRef.current.value,
                parent: currentDir,
                type: "dir",
            });
            setIsModalVisile(false);
        }
    };

    const returnToPreviousFolder = (): void => {
        if (dirStack.length > 0) {
            setCurrentDir(dirStack[dirStack.length - 1]);
            popFromDirStack();
        }
    };

    return (
        <>
            <div className="files-header">
                <div className="files-header__left">
                    <Return
                        color="var(--clr-default-100)"
                        hoverColor="var(--clr-secondary-400)"
                        handler={returnToPreviousFolder}
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
                cancelHandler={setIsModalVisile}
                submitHandler={createDirHandler}
            >
                <Input ref={inputRef} placeholder="Название папки..." />
            </Modal>
        </>
    );
};
