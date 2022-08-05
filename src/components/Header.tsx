import { Link } from "react-router-dom";

import AppTitle from "./style/Header/AppTitle";
import IconButton from "./style/Generics/IconButton";
import AppHeader from "./style/Header/AppHeader";
import Row from "./style/Generics/Row";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

import styled from "styled-components";

const StyledIconButton = styled(IconButton)`
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
`;

const HoveringIconButton = styled(IconButton)`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
`

const Header = () => {
    return (
        <AppHeader>
            <AppTitle>plant tracker</AppTitle>
            <Row>
                {/* <Link to={"/profile"}>
                    <StyledIconButton type="button" id="profile-btn">
                        <PersonIcon />
                    </StyledIconButton>
                </Link> */}
                <Link to={"/add"}>
                    <HoveringIconButton
                        type="button"
                        id="add-plant-form-btn"
                        margin="0 0 0 8px"
                    >
                        <AddIcon />
                    </HoveringIconButton>
                </Link>
            </Row>
        </AppHeader>
    );
};

export default Header;
