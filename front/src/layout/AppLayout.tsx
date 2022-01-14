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
    const { isFetchError: isUserFetchError, isLoading } = useTypedSelector(
        (state) => state.user
    );
    const { isFetchError: isFileFetchError, isFileUploadError } =
        useTypedSelector((state) => state.file);

    // HandlingError
    useEffect(() => {
        if (isUserFetchError || isFileFetchError || isFileUploadError) {
            toast.error(
                isUserFetchError || isFileFetchError || isFileUploadError
            );
        }
    }, [isUserFetchError, isFileFetchError, isFileUploadError]);

    return (
        <>
            <div className="wrapper">
                <Header />
                <main>{isLoading ? <Loader fixed /> : <Outlet />}</main>
            </div>
            <ToastContainer
                closeOnClick={false}
                hideProgressBar={true}
                autoClose={6000}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggable={false}
                limit={3}
            />
        </>
    );
};
