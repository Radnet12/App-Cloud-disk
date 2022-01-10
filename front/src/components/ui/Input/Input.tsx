import { InputHTMLAttributes, forwardRef } from "react";

// Styles
import "./Input.scss";

type FormInputProps = {
    labelText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, FormInputProps>(
    (props, ref) => {
        // **Props
        const { labelText, ...rest } = props;

        return (
            <div className="input">
                <label>
                    {labelText && <span>{labelText}</span>}
                    <input ref={ref} {...rest} />
                </label>
            </div>
        );
    }
);
