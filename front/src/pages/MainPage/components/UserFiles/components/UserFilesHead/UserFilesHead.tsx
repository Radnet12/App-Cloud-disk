import React from "react";

export const UserFilesHead: React.FC = () => {
    return (
        <div className="user-files__head">
            <div className="user-files__head-item user-files__head-item--name">
                Название
            </div>
            <div className="user-files__head-item user-files__head-item--date">
                Дата
            </div>
            <div className="user-files__head-item user-files__head-item--size">
                Размер
            </div>
        </div>
    );
};
