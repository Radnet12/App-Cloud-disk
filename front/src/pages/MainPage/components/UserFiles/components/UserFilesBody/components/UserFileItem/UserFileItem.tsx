import React from "react";

// Redux
import { useDispatchedAction } from "../../../../../../../../hooks/useDispatchedActions";
import { useTypedSelector } from "../../../../../../../../hooks/useTypedSelector";

// Libs
import moment from "moment";

// Types
import { FileType } from "../../../../../../../../store/reducers/FileReducer/FileReducerTypes";

// Utils
import { sizeFormats } from "../../../../../../../../utils/sizeFormats";

// Components
import { CircleButton } from "../../../../../../../../components/ui/CircleButton/CircleButton";

// Styles
import "./UserFileItem.scss";

type UserFileItemProps = {
    file: FileType;
};

export const UserFileItem: React.FC<UserFileItemProps> = (props) => {
    // **Props
    const { file } = props;

    // **Redux state
    const { currentDir } = useTypedSelector((state) => state.file);

    // Dispatch
    const { setCurrentDir, pushToDirStack, downloadFile, deleteFile, setSortType } =
        useDispatchedAction();

    const clickHandler = (): void => {
        if (file.type === "dir") {
            pushToDirStack(currentDir);
            setCurrentDir(file.id);
            setSortType(null);
        }
    };

    const downloadHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        downloadFile(file);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        deleteFile(file.id);
    };

    return (
        <li
            className={
                file.type === "dir"
                    ? "file-item"
                    : "file-item file-item--type-file"
            }
            onClick={clickHandler}
        >
            <div className="file-item__image">
                <img
                    src={
                        file.type === "dir"
                            ? "img/ui/dir.svg"
                            : "img/ui/file.svg"
                    }
                    width={48}
                    height={48}
                    loading="lazy"
                    alt={file.type === "dir" ? "Папка" : "Файл"}
                />
            </div>
            <div className="file-item__name">{file.name}</div>
            {file.type !== "dir" && (
                <CircleButton
                    className="file-item__download"
                    handler={downloadHandler}
                >
                    <svg
                        width="30"
                        height="25"
                        viewBox="0 0 30 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.7755 7.17338L11.588 11.7671L11 10.5938L20.1875 6L20.7755 7.17338ZM20.1875 18.9859L11 14.3921L11.588 13.2188L20.7755 17.8125L20.1875 18.9859Z"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.7188 7.25C23.2409 7.25 23.7417 7.04258 24.1109 6.67337C24.4801 6.30415 24.6875 5.80339 24.6875 5.28125C24.6875 4.75911 24.4801 4.25835 24.1109 3.88913C23.7417 3.51992 23.2409 3.3125 22.7188 3.3125C22.1966 3.3125 21.6958 3.51992 21.3266 3.88913C20.9574 4.25835 20.75 4.75911 20.75 5.28125C20.75 5.80339 20.9574 6.30415 21.3266 6.67337C21.6958 7.04258 22.1966 7.25 22.7188 7.25ZM22.7188 8.5625C23.589 8.5625 24.4236 8.2168 25.0389 7.60144C25.6543 6.98609 26 6.15149 26 5.28125C26 4.41101 25.6543 3.57641 25.0389 2.96106C24.4236 2.3457 23.589 2 22.7188 2C21.8485 2 21.0139 2.3457 20.3986 2.96106C19.7832 3.57641 19.4375 4.41101 19.4375 5.28125C19.4375 6.15149 19.7832 6.98609 20.3986 7.60144C21.0139 8.2168 21.8485 8.5625 22.7188 8.5625V8.5625ZM22.7188 21.6875C23.2409 21.6875 23.7417 21.4801 24.1109 21.1109C24.4801 20.7417 24.6875 20.2409 24.6875 19.7188C24.6875 19.1966 24.4801 18.6958 24.1109 18.3266C23.7417 17.9574 23.2409 17.75 22.7188 17.75C22.1966 17.75 21.6958 17.9574 21.3266 18.3266C20.9574 18.6958 20.75 19.1966 20.75 19.7188C20.75 20.2409 20.9574 20.7417 21.3266 21.1109C21.6958 21.4801 22.1966 21.6875 22.7188 21.6875ZM22.7188 23C23.589 23 24.4236 22.6543 25.0389 22.0389C25.6543 21.4236 26 20.589 26 19.7188C26 18.8485 25.6543 18.0139 25.0389 17.3986C24.4236 16.7832 23.589 16.4375 22.7188 16.4375C21.8485 16.4375 21.0139 16.7832 20.3986 17.3986C19.7832 18.0139 19.4375 18.8485 19.4375 19.7188C19.4375 20.589 19.7832 21.4236 20.3986 22.0389C21.0139 22.6543 21.8485 23 22.7188 23V23ZM8.28125 14.4688C8.80339 14.4687 9.30415 14.2613 9.67337 13.8921C10.0426 13.5229 10.25 13.0221 10.25 12.5C10.25 11.9779 10.0426 11.4771 9.67337 11.1079C9.30415 10.7387 8.80339 10.5312 8.28125 10.5312C7.75911 10.5312 7.25835 10.7387 6.88913 11.1079C6.51992 11.4771 6.3125 11.9779 6.3125 12.5C6.3125 13.0221 6.51992 13.5229 6.88913 13.8921C7.25835 14.2613 7.75911 14.4688 8.28125 14.4688V14.4688ZM8.28125 15.7812C9.15149 15.7812 9.98609 15.4355 10.6014 14.8202C11.2168 14.2048 11.5625 13.3702 11.5625 12.5C11.5625 11.6298 11.2168 10.7952 10.6014 10.1798C9.98609 9.56445 9.15149 9.21875 8.28125 9.21875C7.41101 9.21875 6.57641 9.56445 5.96106 10.1798C5.3457 10.7952 5 11.6298 5 12.5C5 13.3702 5.3457 14.2048 5.96106 14.8202C6.57641 15.4355 7.41101 15.7812 8.28125 15.7812V15.7812Z"
                        />
                    </svg>
                </CircleButton>
            )}
            <CircleButton
                color="var(--clr-ui-error)"
                hoverColor="var(--clr-ui-error)"
                className="file-item__delete"
                handler={deleteHandler}
            >
                <svg
                    width="30"
                    height="25"
                    viewBox="0 0 30 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.3315 5.23077H8V7.69231H9.39227M12.3315 5.23077V4H17.6685V5.23077M12.3315 5.23077H17.6685M17.6685 5.23077H22V7.69231H20.6851M9.39227 7.69231V20H20.6851V7.69231M9.39227 7.69231H12.2155M20.6851 7.69231H17.8232M17.8232 7.69231V17.6752M17.8232 7.69231H15.0387M15.0387 7.69231V17.6752M15.0387 7.69231H12.2155M12.2155 7.69231V17.6752"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </CircleButton>
            <div className="file-item__date">
                {moment(file.date).format("DD.MM.YYYY HH:MM:SS")}
            </div>
            <div className="file-item__size">{sizeFormats(file.size)}</div>
        </li>
    );
};
