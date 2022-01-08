import React from "react";

// Styles
import "./Container.scss";

export const Container: React.FC = (props) => {
    // **Props
    const { children } = props;

    return <div className="container">{children}</div>;
};
