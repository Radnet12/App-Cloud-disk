// Libs
import { Outlet } from "react-router-dom";

// Components
import { Header } from "../components/common/Header/Header";


export const AppLayout = () => {
    return (
        <div className="wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
