import React from "react";

// Redux
import { useDispatchedAction } from "../../../../hooks/useDispatchedActions";

// Libs
import { useForm, FormProvider } from "react-hook-form";

// Componets
import { Button } from "../../../../components/ui/Button/Button";
import { Input } from "../../../../components/ui/Input/Input";

// Types
import { FormAuth } from "../../../../models/FormAuth";

// Utils
import { formRules } from "../../../../utils/formRules";

export const RegistrationForm: React.FC = () => {
    // Dispatch
    const { registration } = useDispatchedAction();

    // **Form
    const methods = useForm<FormAuth>();

    const onSubmit = methods.handleSubmit((data) => {
        registration({ email: data.email, password: data.password });
    });

    return (
        <FormProvider {...methods}>
            <form className="form" onSubmit={onSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Введите почту"
                    rules={{ ...formRules.required("Заполните поле!") }}
                />
                <Input
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
                    Регистрация
                </Button>
            </form>
        </FormProvider>
    );
};
