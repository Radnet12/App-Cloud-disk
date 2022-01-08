import React, { useEffect } from "react";

// Redux
import { useDispatchedAction } from "./hooks/useDispatchedActions";

// Components
import { Router } from "./components/common/Router/Router";

export const App: React.FC = () => {
    // Dispatch
    const { authorization } = useDispatchedAction();

    useEffect(() => {
        authorization();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Router />;
};
