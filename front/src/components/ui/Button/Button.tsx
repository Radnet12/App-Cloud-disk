import React, { ButtonHTMLAttributes } from "react";

// Types
import { Positions, Sizes, BtnTypes } from "./ButtonEnums";

// Style
import "./Button.scss";

type ButtonProps = {
    size?: Sizes;
    position?: Positions;
    btnType?: BtnTypes;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
    // **Props
    const {
        size = "small",
        position,
        btnType = "default",
        className,
        children,
        ...rest
    } = props;

    const defineClassnames = (): string => {
        let className = "btn";

        switch (position) {
            case "left": {
                className += " btn__position--left";
                break;
            }
            case "right": {
                className += " btn__position--right";
                break;
            }
            case "center": {
                className += " btn__position--center";
                break;
            }
            default: {
                break;
            }
        }

        switch (size) {
            case "small": {
                className += " btn__size--small";
                break;
            }
            case "middle": {
                className += " btn__size--middle";
                break;
            }
            case "large": {
                className += " btn__size--large";
                break;
            }
            case "full": {
                className += " btn__size--full";
                break;
            }
            default: {
                break;
            }
        }

        switch (btnType) {
            case "danger": {
                className += " btn__type--danger";
                break;
            }
            case "error": {
                className += " btn__type--error";
                break;
            }
            case "stroke": {
                className += " btn__type--stroke";
                break;
            }
            default: {
                className += " btn__type--default";
                break;
            }
        }

        return className;
    };

    return (
        <button className={defineClassnames()} {...rest}>
            {children}
        </button>
    );
};
