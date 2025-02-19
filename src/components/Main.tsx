import Plants from "./Plants";
import Header from "./Header";
import Column from "./style/Generics/Column";

import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ShowNotification from "./ShowNotification";

import { NotificationState } from "../types";

const StyledColumn = styled(Column)`
    padding: 0 1rem 110px 1rem;
    background-color: rgb(235, 243, 241);
    min-height: 100vh;
`;

const Main = () => {
    const state = useLocation().state as NotificationState;

    return (
        <>
            {state?.notification && (
                <ShowNotification notification={state?.notification} />
            )}
            <StyledColumn>
                <Header />
                <Plants />
            </StyledColumn>
        </>
    );
};

export default Main;
