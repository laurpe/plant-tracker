import AppTitle from "./style/Header/AppTitle";
import Button from "./style/Generics/Button";
import AppHeader from "./style/Header/AppHeader";

import AddIcon from "@mui/icons-material/Add";

interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <AppHeader>
            <AppTitle>Plant tracker</AppTitle>
            <Button type="button" onClick={handleToggleFormClick}>
                <AddIcon />
            </Button>
        </AppHeader>
    );
};

export default Header;
