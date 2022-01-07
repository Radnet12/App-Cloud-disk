import { ReactNode } from "react";

// Styles
import "./Container.scss";

type ContainerProps = {
    children: ReactNode;
};

export const Container = (props: ContainerProps) => {
    // **Props
    const { children } = props;

    return <div className="container">{children}</div>;
};
