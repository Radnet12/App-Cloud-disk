import React from "react";

// Redux
import { useDispatchedAction } from "../../../../hooks/useDispatchedActions";

// Libs
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../../../../components/ui/Button/Button";

// Components
import { FormInput } from "../../../../components/ui/FormInput/FormInput";

// Types
import { FormAuth } from "../../../../models/FormAuth";

// Utils
import { formRules } from "../../../../utils/formRules";

export const LoginForm: React.FC = () => {
    // Dispatch
    const { login } = useDispatchedAction();

    // **Form
    const methods = useForm<FormAuth>();

    const onSubmit = methods.handleSubmit((data) => {
        login({ email: data.email, password: data.password });
    });

    return (
        <FormProvider {...methods}>
            <form className="form" onSubmit={onSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    placeholder="Введите почту"
                    rules={{ ...formRules.required("Заполните поле!") }}
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    rules={{
                        ...formRules.required("Заполните поле!"),
                        ...formRules.maxLength(
                            32,
                            "Максимальное кол-во символов 32"
                        ),
                        ...formRules.minLength(
                            5,
                            "Минимальное кол-во символов 5"
                        ),
                    }}
                />
                <Button position="center" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};
