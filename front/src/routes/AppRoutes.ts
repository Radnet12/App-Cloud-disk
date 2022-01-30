import { lazy } from "react";

// Types
import { Route } from "../models/Route";
import { RouteNames } from "./RouteNames";

export const AppRoutes: Route[] = [
    {
        path: RouteNames.MAIN,
        component: lazy(() => import("../pages/MainPage/MainPage")),
    },
    {
        path: RouteNames.PROFILE,
        component: lazy(() => import("../pages/ProfilePage/ProfilePage")),
    },
];
