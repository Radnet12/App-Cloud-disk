// Components
import { Container } from "../../components/ui/Container/Container";
import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";

const RegistrationPage: React.FC = () => {
    return (
        <section className="auth">
            <Container>
                <div className="auth__wrapper">
                    <h1 className="section__title section__title--centered">
                        Регистрация
                    </h1>
                    <RegistrationForm />
                </div>
            </Container>
        </section>
    );
};

export default RegistrationPage;
