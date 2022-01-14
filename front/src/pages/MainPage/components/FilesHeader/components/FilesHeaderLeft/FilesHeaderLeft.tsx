import React, { useRef, useState } from "react";

// Redux
import { useTypedSelector } from "../../../../../../hooks/useTypedSelector";
import { useDispatchedAction } from "../../../../../../hooks/useDispatchedActions";

// Components
import { Return } from "../../../../../../components/ui/Return/Return";
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
