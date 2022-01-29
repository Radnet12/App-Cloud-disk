import React, { ChangeEvent, useEffect, useState } from "react";

// Hooks
import { useDebounce } from "../../../../../hooks/useDebounce";
import { useDispatchedAction } from "../../../../../hooks/useDispatchedActions";

// Styles
import "./Search.scss";

export const Search: React.FC = () => {
    // **Local state
    const [inputValue, setInputValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(inputValue, 500);

    // Dispatch
    const { searchFiles, getFiles } = useDispatchedAction();

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (debouncedValue) {
            searchFiles(debouncedValue);
        } else {
            getFiles({ folderId: null, sortType: null });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    return (
        <div className="search">
            <input
                value={inputValue}
                type="text"
                placeholder="Поиск..."
                onInput={onInputHandler}
            />
            <span></span>
        </div>
    );
};
