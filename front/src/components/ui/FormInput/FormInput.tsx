import { InputHTMLAttributes } from "react";

// Libs
import { RegisterOptions, useFormContext } from "react-hook-form";

// Styles
import "./FormInput.scss";

type FormInputProps = {
    rules: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: React.FC<FormInputProps> = (props) => {
    // **Props
    const { rules, name, ...rest } = props;

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="form__input">
            <label>
                <input {...register(name!, rules)} {...rest} />
            </label>
            {!!errors[name!] && (
                <p className="form__input-error">{errors[name!]?.message}</p>
            )}
        </div>
    );
};
