import AppTitle from "./style/Header/AppTitle";
import IconButton from "./style/Generics/IconButton";
import AppHeader from "./style/Header/AppHeader";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <AppHeader>
            <AppTitle>plant tracker</AppTitle>
            <IconButton
                type="button"
                id="add-plant-form-btn"
                onClick={handleToggleFormClick}
            >
                <AddIcon />
            </IconButton>
        </AppHeader>
    );
};

export default Header;
