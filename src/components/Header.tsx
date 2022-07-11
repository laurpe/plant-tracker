import AppTitle from "./style/Header/AppTitle";
import AddPlantButton from "./style/Header/AddPlantButton";
import AppHeader from "./style/Header/AppHeader";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <AppHeader>
            <AppTitle>plant tracker</AppTitle>
            <AddPlantButton
                type="button"
                id="add-plant-form-btn"
                onClick={handleToggleFormClick}
            >
                <AddIcon />
            </AddPlantButton>
        </AppHeader>
    );
};

export default Header;
