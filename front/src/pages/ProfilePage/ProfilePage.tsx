import React from "react";

// Redux
import { useDispatchedAction } from "../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

// Components
import { Container } from "../../components/ui/Container/Container";
import { CircleButton } from "../../components/ui/CircleButton/CircleButton";
import { UploadFile } from "../../components/ui/UploadFile/UploadFile";

// Styles
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
    // **Redux store
    const { user } = useTypedSelector((state) => state.user);

    // Dispatch
    const { uploadAvatar, deleteAvatar } = useDispatchedAction();


    const loadedFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e?.target?.files && e.target.files.length > 0) {
            uploadAvatar(e.target.files[0]);
        }
    };

    const deleteAvatarHandler = () => {
        if (user?.avatar) {
            deleteAvatar();
        }
    };

    return (
        <section className="profile">
            <Container>
                <div className="profile__wrapper">
                    {!user?.avatar && (
                        <UploadFile
                            labelText="Загрузить изображение"
                            onChange={loadedFiles}
                            multiple={true}
                            accept="image/*"
                            wrapperStyle={
                                {
                                    "--color": "var(--clr-default-100)",
                                    "--hoverColor": "var(--clr-secondary-400)",
                                } as React.CSSProperties
                            }
                        />
                    )}
                    <CircleButton
                        handler={deleteAvatarHandler}
                        style={{ marginLeft: 15 }}
                        disabled={!user?.avatar}
                    >
                        Удалить изображение
                    </CircleButton>
                </div>
            </Container>
        </section>
    );
};

export default ProfilePage;
