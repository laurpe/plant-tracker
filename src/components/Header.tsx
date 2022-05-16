import ButtonAddPlant from "./style/ButtonAddPlant";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <header>
            <h1>Plant tracker</h1>
            <ButtonAddPlant
                type="button"
                id="show-add-plant-form"
                onClick={handleToggleFormClick}
            >
                <AddIcon />
            </ButtonAddPlant>
        </header>
    );
};

export default Header;
