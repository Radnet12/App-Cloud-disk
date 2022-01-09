import React, { useEffect } from "react";

// Redux
import { useTypedSelector } from "../hooks/useTypedSelector";

// Libs
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Components
import { Header } from "../components/common/Header/Header";
import { Loader } from "../components/ui/Loader/Loader";

export const AppLayout: React.FC = () => {
    // **Redux state
    const { isFetchError: isUserFetchError, isLoading } = useTypedSelector((state) => state.user);
    const { isFetchError: isFileFetchError } = useTypedSelector((state) => state.file);

    // HandlingError
    useEffect(() => {
        if (isUserFetchError || isFileFetchError) {
            toast.error(isUserFetchError || isFileFetchError, {
                toastId: 1,
            });
        }
    }, [isUserFetchError, isFileFetchError]);

    return (
        <>
            <div className="wrapper">
                <Header />
                <main>{isLoading ? <Loader fixed /> : <Outlet />}</main>
            </div>
            <ToastContainer />
        </>
    );
};
