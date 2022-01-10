import { InputHTMLAttributes } from "react";

// Styles
import "./Input.scss";

type FormInputProps = {
    labelText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<FormInputProps> = (props) => {
    // **Props
    const { labelText, ...rest } = props;

    return (
        <div className="input">
            <label>
                {labelText && <span>{labelText}</span>}
                <input {...rest} />
            </label>
        </div>
    );
};
