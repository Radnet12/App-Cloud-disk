// Redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// Componets
import { Container } from "../../ui/Container/Container";
import { Logo } from "../../ui/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import { Search } from "./components/Search/Search";

// Styles
import "./Header.scss";

export const Header: React.FC = () => {
    // **Redux state
    const { isAuth } = useTypedSelector((state) => state.user);

    return (
        <header className="header">
            <Container>
                <div className="header__wrapper">
                    <Logo />
                    {isAuth && <Search />}
                    <Navigation />
                </div>
            </Container>
        </header>
    );
};
