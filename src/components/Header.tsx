import { Link } from "react-router-dom";

import AppTitle from "./style/Header/AppTitle";
import IconButton from "./style/Generics/IconButton";
import AppHeader from "./style/Header/AppHeader";

import AddIcon from "@mui/icons-material/Add";

import styled from "styled-components";

const StyledIconButton = styled(IconButton)`
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
`;

const Header = () => {
    return (
        <AppHeader>
            <AppTitle>plant tracker</AppTitle>
            <Link to={"/add"}>
                <StyledIconButton type="button" id="add-plant-form-btn">
                    <AddIcon />
                </StyledIconButton>
            </Link>
        </AppHeader>
    );
};

export default Header;
