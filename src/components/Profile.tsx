import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";
import Button from "./style/Generics/Button";

import Confirmation from "./Confirmation";

import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

import styled from "styled-components";

import { useUser } from "../hooks/useUser";
import { axiosPrivate } from "../util/axiosPrivate";

const StyledRow = styled(Row)`
    border-bottom: 1px solid #ccdbd9;
    padding: 1.2rem;
`;

const StyledButton = styled(Button)`
    background: white;
    color: #ea5c5c;
`;

const Profile = () => {
    const [confirm, setConfirm] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL as string;

    const handleDeleteClick = () => {
        setConfirm(true);
    };

    const hideConfirmation = () => {
        setConfirm(false);
    };

    const deleteResource = async () => {
        try {
            await axiosPrivate.delete(`${baseUrl}/users`, {
                headers: { Authorization: `Bearer ${user.token || ""}` },
            });
            logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                    <Row padding="0 0 0 1rem">
                        <StyledButton
                            type="button"
                            id="delete-account-btn"
                            onClick={() => handleDeleteClick()}
                        >
                            Delete account
                        </StyledButton>
                    </Row>
                </Column>
            </Column>
            {confirm && (
                <Confirmation
                    deleteResource={deleteResource}
                    hideConfirmation={hideConfirmation}
                    text="Are you sure you want to delete your account?"
                />
            )}
        </>
    );
};

export default Profile;
