import React, { ButtonHTMLAttributes } from "react";

// Types
import { Positions, PositionsEnum, Sizes, SizesEnum } from "./ButtonEnums";

// Style
import "./Button.scss";

type ButtonProps = {
    size?: Sizes;
    position?: Positions;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
    // **Props
    const {
        size = SizesEnum.SMALL,
        position,
        className,
        children,
        ...rest
    } = props;

    const defineClassnames = (): string => {
        let className = "btn";

        switch (position) {
            case PositionsEnum.LEFT: {
                className += " btn__position--left";
                break;
            }
            case PositionsEnum.RIGHT: {
                className += " btn__position--right";
                break;
            }
            case PositionsEnum.CENTER: {
                className += " btn__position--center";
                break;
            }
            default: {
                break;
            }
        }

        switch (size) {
            case SizesEnum.SMALL: {
                className += " btn__size--small";
                break;
            }
            case SizesEnum.MIDDLE: {
                className += " btn__size--middle";
                break;
            }
            case SizesEnum.LARGE: {
                className += " btn__size--large";
                break;
            }
            case SizesEnum.FULL: {
                className += " btn__size--full";
                break;
            }
            default: {
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
