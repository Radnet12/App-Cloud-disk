import React from "react";

// Components
import { Head } from "./components/Head/Head";
import { Body } from "./components/Body/Body";

// Styles
import "./UserFiles.scss";

export const UserFiles: React.FC = () => {
    return <div className="user-files">
        <Head />
        <Body />
    </div>;
};
