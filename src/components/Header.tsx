import ButtonAddPlant from "./style/ButtonAddPlant";
import AppTitle from "./style/Header/AppTitle";
import AppHeader from "./style/Header/AppHeader";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <AppHeader>
            <AppTitle>Plant tracker</AppTitle>
            <ButtonAddPlant
                type="button"
                id="show-add-plant-form"
                onClick={handleToggleFormClick}
            >
                <AddIcon />
            </ButtonAddPlant>
        </AppHeader>
    );
};

export default Header;
