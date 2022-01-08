// Componets
import { Container } from "../../ui/Container/Container";
import { Logo } from "../../ui/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";

// Styles
import "./Header.scss";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <Container>
                <div className="header__wrapper">
                    <Logo />
                    <Navigation />
                </div>
            </Container>
        </header>
    );
};
