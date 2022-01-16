import { useEffect, useState } from "react";

// Redux
import { useDispatchedAction } from "../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

// Libs
import { toast } from "react-toastify";

// Components
import { Container } from "../../components/ui/Container/Container";
import { DragZone } from "../../components/ui/DragZone/DragZone";
import { FilesHeader } from "./components/FilesHeader/FilesHeader";
import { UserFiles } from "./components/UserFiles/UserFiles";
import { UploadContainer } from "../../components/ui/UploadContainer/UploadContainer";

// Styles
import "./MainPage.scss";

const MainPage: React.FC = () => {
    // **Redux state
    const { currentDir } = useTypedSelector((state) => state.file);
    const { files } = useTypedSelector((state) => state.upload);

    // **Local state
    const [dragEnter, setDragEnter] = useState<boolean>(false);

    // Dispatch
    const { uploadFile } = useDispatchedAction();

    // Handlers
    const onDragEnterHandler = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    };

    const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    };

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e?.dataTransfer?.files && e.dataTransfer.files.length > 0) {
            for (let i = 0; i < e.dataTransfer.files?.length; i++) {
                uploadFile({
                    file: e.dataTransfer.files[i],
                    parent: currentDir,
                });
            }
        }
        setDragEnter(false);
    };

    // Uploading file progress
    useEffect(() => {
        files.forEach((file) => {
            if (toast.isActive(file.id)) {
                toast.update(file.id, {
                    render: <UploadContainer file={file} />,
                    type: "info",
                });
            } else {
                toast(<UploadContainer file={file} />, {
                    toastId: file.id,
                    type: "info",
                });
            }
        });
    }, [files]);

    return (
        <section className="hero">
            <Container>
                <div
                    className="hero__wrapper"
                    onDrop={onDropHandler}
                    onDragEnter={onDragEnterHandler}
                    onDragLeave={onDragLeaveHandler}
                    onDragOver={onDragEnterHandler}
                >
                    {dragEnter ? (
                        <DragZone />
                    ) : (
                        <>
                            <FilesHeader />
                            <UserFiles />
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default MainPage;
