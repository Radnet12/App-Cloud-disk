// Components
import { FilesHeaderLeft } from "./components/FilesHeaderLeft/FilesHeaderLeft";
import { FilesHeaderRight } from "./components/FilesHeaderRight/FilesHeaderRight";

// Styles
import "./FilesHeader.scss";

export const FilesHeader: React.FC = () => {
    return (
        <>
            <div className="files-header">
                <FilesHeaderLeft />
                <FilesHeaderRight />
            </div>
        </>
    );
};
