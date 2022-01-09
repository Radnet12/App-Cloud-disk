import React, { ButtonHTMLAttributes } from "react";

// **Styles
import "./Return.scss";

type ReturnProps = {
    color: string;
    hoverColor: string;
    handler?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Return: React.FC<ReturnProps> = (props) => {
    // **Props
    const { color, hoverColor, className, ...rest } = props;

    // Styles
    const styles = {
        "--color": color,
        "--hoverColor": hoverColor,
    } as React.CSSProperties;

    return (
        <button
            style={styles}
            className={className ? `return-btn ${className}` : "return-btn"}
            {...rest}
        >
            <svg
                width="55"
                height="34"
                viewBox="0 0 55 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="0.5" y="0.5" width="54" height="33" rx="16.5" />
                <path
                    d="M21 11L15 15L21 19"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16 15H32.905C36.2837 15 39 18.4685 39 22.5938V24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};
