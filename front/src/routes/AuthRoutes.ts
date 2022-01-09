import { lazy } from "react";

// Types
import { Route } from "../models/Route";
import { RouteNames } from "./RouteNames";


export const AuthRoutes: Route[] = [
    {
        path: RouteNames.LOGIN,
        component: lazy(() => import("../pages/LoginPage/LoginPage")),
    },
    {
        path: RouteNames.REGISTRATION,
        component: lazy(
            () => import("../pages/RegistrationPage/RegistrationPage")
        ),
    },
];
