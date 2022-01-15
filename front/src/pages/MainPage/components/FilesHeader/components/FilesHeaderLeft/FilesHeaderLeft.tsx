import React, { useRef, useState } from "react";

// Redux
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { useDispatchedAction } from "../../../../../../hooks/useDispatchedActions";

// Components
import { CircleButton } from "../../../../../../components/ui/CircleButton/CircleButton";
import { UploadFile } from "../../../../../../components/ui/UploadFile/UploadFile";
import { Modal } from "../../../../../../components/common/Modal/Modal";
import { Input } from "../../../../../../components/ui/Input/Input";

export const FilesHeaderLeft: React.FC = () => {
    // **Redux state
    const { currentDir, dirStack } = useTypedSelector((state) => state.file);

    // **Local state
    const [isModalVisible, setIsModalVisile] = useState<boolean>(false);

    // **Ref
    const inputRef = useRef<HTMLInputElement>(null!);

    // Dispatch
    const { createDir, popFromDirStack, setCurrentDir, uploadFile } =
        useDispatchedAction();

    const returnToPreviousFolder = (): void => {
        if (dirStack.length > 0) {
            setCurrentDir(dirStack[dirStack.length - 1]);
            popFromDirStack();
        }
    };

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

    const loadedFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e?.target?.files && e.target.files.length > 0) {
            for (let i = 0; i < e.target.files?.length; i++) {
                uploadFile({ file: e.target.files[i], parent: currentDir });
            }
        }
    };

    return (
        <>
            <div className="files-header__left">
                <div className="files-header__left-row">
                    <CircleButton handler={returnToPreviousFolder}>
                        <svg
                            width="30"
                            height="25"
                            viewBox="0 0 30 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 6L3 10L9 14"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 10H20.905C24.2837 10 27 13.4685 27 17.5938V19"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </CircleButton>
                    <CircleButton
                        handler={() => setIsModalVisile(true)}
                        style={{ marginLeft: 15 }}
                    >
                        Создать новую папку
                    </CircleButton>
                </div>
                <UploadFile
                    labelText="Загрузить файлы"
                    onChange={loadedFiles}
                    multiple={true}
                    wrapperStyle={
                        {
                            "--color": "var(--clr-default-100)",
                            "--hoverColor": "var(--clr-secondary-400)",
                            marginTop: 15,
                        } as React.CSSProperties
                    }
                />
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
