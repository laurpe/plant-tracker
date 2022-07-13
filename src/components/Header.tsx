import AppTitle from "./style/Header/AppTitle";
import IconButton from "./style/Generics/IconButton";
import AppHeader from "./style/Header/AppHeader";

import AddIcon from "@mui/icons-material/Add";

import styled from "styled-components";

interface Props {
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledIconButton = styled(IconButton)`
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
`;

const Header = ({ handleToggleFormClick }: Props) => {
    return (
        <AppHeader>
            <AppTitle>plant tracker</AppTitle>
            <StyledIconButton
                type="button"
                id="add-plant-form-btn"
                onClick={handleToggleFormClick}
            >
                <AddIcon />
            </StyledIconButton>
        </AppHeader>
    );
};

export default Header;
