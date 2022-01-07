// Types
import { Route } from "../models/Route";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage/RegistrationPage";
import { RouteNames } from "./RouteNames";

// Components

export const AuthRoutes: Route[] = [
    {
        path: RouteNames.LOGIN,
        component: LoginPage,
    },
    {
        path: RouteNames.REGISTRATION,
        component: RegistrationPage,
    },
];
