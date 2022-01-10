import React from "react";

// Components
import { UserFilesHead } from "./components/UserFilesHead/UserFilesHead";
import { UserFilesBody } from "./components/UserFilesBody/UserFilesBody";

// Styles
import "./UserFiles.scss";

export const UserFiles: React.FC = () => {
    return (
        <div className="user-files">
            <UserFilesHead />
            <UserFilesBody />
        </div>
    );
};
