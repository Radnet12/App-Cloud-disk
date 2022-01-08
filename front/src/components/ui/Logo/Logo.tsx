import React from "react";

// Redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// Libs
import { Link } from "react-router-dom";

// Routes
import { RouteNames } from "../../../routes/RouteNames";

// Styles
import "./Logo.scss";

export const Logo: React.FC = () => {
    // **Redux state
    const { isAuth } = useTypedSelector((state) => state.user);

    return (
        <div className="logo">
            <Link to={isAuth ? RouteNames.MAIN : RouteNames.LOGIN}>
                <div className="logo__image">
                    <img
                        src="img/ui/logo.svg"
                        width={63}
                        height={34}
                        alt="Логотип компании Облачное хранилище"
                    />
                </div>
                <div className="logo__name">Cloud storage</div>
            </Link>
        </div>
    );
};
