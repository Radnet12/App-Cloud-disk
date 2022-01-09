import React from "react";

// Styles
import "./Loader.scss";

type LoaderProps = {
    fixed?: boolean;
};

export const Loader: React.FC<LoaderProps> = (props) => {
    // **Props
    const { fixed } = props;

    return (
        <div className={fixed ? "loader loader--fixed" : "loader"}>
            <div className="loader__wrapper">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
