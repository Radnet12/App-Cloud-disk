// Types
import { Route } from "../models/Route";
import { RouteNames } from "./RouteNames";

// Components
import { MainPage } from "../pages/MainPage/MainPage";

export const AppRoutes: Route[] = [
    {
        path: RouteNames.MAIN,
        component: MainPage,
    },
];
