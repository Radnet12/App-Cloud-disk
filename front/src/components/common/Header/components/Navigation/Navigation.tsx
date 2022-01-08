import React from "react";

// Libs
import { Link } from "react-router-dom";

// Styles
import "./Navigation.scss";

export const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    <Link to="/login">Войти</Link>
                </li>
                <li className="navigation__item">
                    <Link to="/registration">Регистрация</Link>
                </li>
            </ul>
        </nav>
    );
};
