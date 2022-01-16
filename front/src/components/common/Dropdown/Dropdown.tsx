import React, { useState } from "react";

// Types
import { Option } from "../../../models/Options";

// Styles
import "./Dropdown.scss";

type DropdownProps = {
    options: Option[];
    defaultActiveItem: Option;
    className?: string;
    onClick?: (option: Option) => void;
};

export const Dropdown: React.FC<DropdownProps> = (props) => {
    // **Props
    const { options, defaultActiveItem, className, onClick, ...rest } = props;

    // **Local state
    const [activeItem, setActiveItem] = useState<Option>(defaultActiveItem);

    const clickHandler = (option: Option) => {
        setActiveItem(option);

        if (onClick) {
            onClick(option);
        }
    };

    return (
        <div
            className={className ? `dropdown ${className}` : "dropdown"}
            {...rest}
        >
            <div className="dropdown__current">
                <span className="dropdown__current-value">
                    {activeItem.label}
                </span>
                <div className="dropdown__current-arrow">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1L5 5L9.5 1" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
            <ul className="dropdown__list">
                {options.length > 0 ? (
                    options.map((option) => (
                        <li
                            className="dropdown__list-item"
                            key={option.value}
                            onClick={() => clickHandler(option)}
                        >
                            {option.label}
                        </li>
                    ))
                ) : (
                    <li>Пусто...</li>
                )}
            </ul>
        </div>
    );
};
