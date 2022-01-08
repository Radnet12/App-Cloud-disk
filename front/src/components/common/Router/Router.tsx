import React from "react";

// Redux
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// Libs
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import { AppLayout } from "../../../layout/AppLayout";

// Routes
import { AuthRoutes } from "../../../routes/AuthRoutes";
import { AppRoutes } from "../../../routes/AppRoutes";
import { RouteNames } from "../../../routes/RouteNames";

export const Router: React.FC = () => {
    // **Redux State
    const { isAuth } = useTypedSelector((state) => state.user);

    const renderAuthRoutes = (): React.ReactNode => {
        return [
            ...AuthRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                />
            )),
            <Route
                key="no-match"
                path="*"
                element={<Navigate to={RouteNames.LOGIN} />}
            />,
        ];
    };

    const renderAppRoutes = (): React.ReactNode => {
        return [
            ...AppRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                />
            )),
            <Route
                key="no-match"
                path="*"
                element={<Navigate to={RouteNames.MAIN} />}
            />,
        ];
    };

    return (
        <Routes>
            <Route element={<AppLayout />}>
                {isAuth ? renderAppRoutes() : renderAuthRoutes()}
            </Route>
        </Routes>
    );
};
