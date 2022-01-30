import React from "react";

// Redux
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useDispatchedAction } from "../../../../../hooks/useDispatchedActions";

// Libs
import { NavLink } from "react-router-dom";

// Styles
import "./Navigation.scss";

export const Navigation: React.FC = () => {
    // **Redux state
    const { isAuth, user } = useTypedSelector((state) => state.user);

    // Dispatch
    const { logout } = useDispatchedAction();

    const logoutHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
    };

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {isAuth ? (
                    <>
                        <li className="navigation__item">
                            <NavLink
                                className="navigation__link"
                                to="/logout"
                                onClick={logoutHandler}
                            >
                                Выйти
                            </NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink to="/profile">
                                <img
                                    src={
                                        user.avatar
                                            ? `http://localhost:5000/${user.avatar}`
                                            : "img/ui/user.png"
                                    }
                                    width={40}
                                    height={40}
                                    alt={user.email}
                                />
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navigation__item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "navigation__link navigation__link--active"
                                        : "navigation__link"
                                }
                                to="/login"
                            >
                                Войти
                            </NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "navigation__link navigation__link--active"
                                        : "navigation__link"
                                }
                                to="/registration"
                            >
                                Регистрация
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
