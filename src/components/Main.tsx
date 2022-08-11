import Plants from "./Plants";
import Header from "./Header";
import Column from "./style/Generics/Column";
import ShowNotification from "./ShowNotification";

import styled from "styled-components";

const StyledColumn = styled(Column)`
    padding: 0 1rem 110px 1rem;
    background-color: rgb(235, 243, 241);
    min-height: 100vh;
`
//TODO: remove notification component!
const Main = () => {
    return (
        <StyledColumn>
            <Header />
            <ShowNotification />
            <Plants />
        </StyledColumn>
    );
};

export default Main;
