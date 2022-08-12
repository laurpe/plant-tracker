import Plants from "./Plants";
import Header from "./Header";
import Column from "./style/Generics/Column";

import styled from "styled-components";

const StyledColumn = styled(Column)`
    padding: 0 1rem 110px 1rem;
    background-color: rgb(235, 243, 241);
    min-height: 100vh;
`;

const Main = () => {
    return (
        <StyledColumn>
            <Header />
            <Plants />
        </StyledColumn>
    );
};

export default Main;
