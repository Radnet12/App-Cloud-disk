import React from "react";

// Redux
import { useDispatchedAction } from "../../../../../../hooks/useDispatchedActions";

// Componenets
import { Dropdown } from "../../../../../../components/common/Dropdown/Dropdown";

// Types
import { Option } from "../../../../../../models/Options";

// Options
import { sortTypes } from "../../../../../../options/sortTypes";

export const FilesHeaderRight: React.FC = () => {
    // Dispatch
    const { setSortType } = useDispatchedAction();

    const changeSort = (option: Option) => {
        setSortType(option.value);
    };

    return (
        <div className="files-header__right">
            <Dropdown
                options={sortTypes}
                defaultActiveItem={sortTypes[0]}
                onClick={changeSort}
            />
        </div>
    );
};
