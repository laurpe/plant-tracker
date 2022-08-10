import { useNavigate } from "react-router-dom";

import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

import styled from "styled-components";

import { useUser } from "../hooks/useUser";

const StyledRow = styled(Row)`
    border-bottom: 1px solid #ccdbd9;
    padding: 1.2rem;
`;

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    return (
        <Column>
            <Row justifyContent="space-between" padding="0 0 1.5rem 1rem">
                <Title>Profile</Title>
                <Row>
                    <IconButton
                        type="button"
                        id="logout-btn"
                        onClick={() => logout()}
                    >
                        <LogoutIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                    <IconButton
                        type="button"
                        onClick={() => navigate("/main")}
                    >
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
            </Row>
            <Column padding="0 0 40px 0">
                <StyledRow justifyContent="space-between">
                    <div>email</div>
                    <div>{user.email}</div>
                </StyledRow>
            </Column>
        </Column>
    );
};

export default Profile;
