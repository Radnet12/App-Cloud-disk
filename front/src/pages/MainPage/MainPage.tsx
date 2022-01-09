// Components
import { Container } from "../../components/ui/Container/Container";
import { FilesHeader } from "./components/FilesHeader/FilesHeader";
import { UserFiles } from "./components/UserFiles/UserFiles";

// Styles
import "./MainPage.scss";

const MainPage: React.FC = () => {
    return (
        <section className="hero">
            <Container>
                <div className="hero__wrapper">
                    <FilesHeader />
                    <UserFiles />
                </div>
            </Container>
        </section>
    );
};

export default MainPage;
