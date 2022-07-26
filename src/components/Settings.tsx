import { useNavigate } from "react-router-dom";

import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";

const StyledRow = styled(Row)`
    border-bottom: 1px solid #ccdbd9;
    padding: 20px 0 20px 0;
`;

const Settings = () => {
    const navigate = useNavigate();
    return (
        <Popup>
            <Column height="100%" padding="0 0 40px 0">
                <Row justifyContent="space-between">
                    <Title>Settings</Title>
                    <IconButton type="button" onClick={() => navigate("/")}>
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
                <Column>
                    <StyledRow justifyContent="space-between">
                        <div>email</div>
                        <div>email address</div>
                    </StyledRow>
                    <StyledRow justifyContent="space-between">
                        <div>password</div>
                        <div>change</div>
                    </StyledRow>
                </Column>
            </Column>
        </Popup>
    );
};

export default Settings;
