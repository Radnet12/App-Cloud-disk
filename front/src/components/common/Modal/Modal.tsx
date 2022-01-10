import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Libs
import { Transition } from "react-transition-group";

// Components
import { Button } from "../../ui/Button/Button";

// Styles
import "./Modal.scss";

type ModalProps = {
    visible: boolean;
    title?: string;
    footer?: boolean;
    footerCancelBtnText?: string;
    footerSubmitBtnText?: string;
    animationDuration?: number;
    width?: number;
    submitHandler: () => void;
    cancelHandler: (state: boolean) => void;
};

const ModalRoot = document.createElement("div");

export const Modal: React.FC<ModalProps> = (props) => {
    // **Props
    const {
        visible,
        title,
        footer,
        footerCancelBtnText = "Отменить",
        footerSubmitBtnText = "Подтвердить",
        animationDuration = 300,
        width = 800,
        submitHandler,
        cancelHandler,
        children,
    } = props;

    const styles = {
        "--duration": `${animationDuration}ms`,
        "--width": `${width}px`,
    } as React.CSSProperties;

    const closeModal = (): void => {
        cancelHandler(false);
    };

    const submitModal = () => {
        submitHandler();
    };

    // Inserting and deleting modal
    useEffect(() => {
        document.body.appendChild(ModalRoot);

        return (): void => {
            document.body.removeChild(ModalRoot);
        };
    }, []);

    return ReactDOM.createPortal(
        <Transition
            in={visible}
            timeout={animationDuration}
            mountOnEnter
            unmountOnExit
        >
            {(state) => (
                <div
                    style={styles}
                    className={`modal ${state}`}
                    onClick={closeModal}
                >
                    <div className="modal__wrapper">
                        <div
                            className={
                                title
                                    ? "modal__content modal__content--has-title"
                                    : "modal__content"
                            }
                            onClick={(e) => e.stopPropagation()}
                        >
                            {title && (
                                <div className="modal__content-title">
                                    {title}
                                </div>
                            )}
                            <div className="modal__content-body">
                                {children}
                            </div>
                            {footer && (
                                <div className="modal__content-footer">
                                    <Button
                                        style={{
                                            marginBottom: 5,
                                            marginTop: 5,
                                        }}
                                        onClick={closeModal}
                                        btnType="danger"
                                    >
                                        {footerCancelBtnText}
                                    </Button>
                                    <Button
                                        style={{
                                            marginLeft: 15,
                                            marginBottom: 5,
                                            marginTop: 5,
                                        }}
                                        onClick={submitModal}
                                    >
                                        {footerSubmitBtnText}
                                    </Button>
                                </div>
                            )}
                            <button
                                className="modal__close"
                                aria-label="Закрыть модальное окно"
                                onClick={closeModal}
                            ></button>
                        </div>
                    </div>
                </div>
            )}
        </Transition>,
        ModalRoot
    );
};
