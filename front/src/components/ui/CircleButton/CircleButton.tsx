import React, { ButtonHTMLAttributes } from "react";

// **Styles
import "./CircleButton.scss";

type ReturnProps = {
    color?: string;
    hoverColor?: string;
    handler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CircleButton: React.FC<ReturnProps> = (props) => {
    // **Props
    const {
        color = "var(--clr-default-100)",
        hoverColor = "var(--clr-secondary-400)",
        handler,
        className,
        children,
        style,
        ...rest
    } = props;

    // Styles
    const styles = {
        "--color": color,
        "--hoverColor": hoverColor,
        ...style,
    } as React.CSSProperties;

    return (
        <button
            style={styles}
            className={className ? `circle-btn ${className}` : "circle-btn"}
            onClick={handler}
            {...rest}
        >
            {children}
        </button>
    );
};
