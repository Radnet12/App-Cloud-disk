import React from "react";

// Components
import { Container } from "../../components/ui/Container/Container";
import { LoginForm } from "./components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <section className="auth">
            <Container>
                <div className="auth__wrapper">
                    <h1 className="section__title section__title--centered">
                        Авторизация
                    </h1>
                    <LoginForm />
                </div>
            </Container>
        </section>
    );
};

export default LoginPage;
