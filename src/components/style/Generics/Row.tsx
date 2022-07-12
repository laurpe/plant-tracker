import styled from "styled-components";

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props: { justifyContent?: string }) =>
        props.justifyContent || "start"};
    align-items: center;
`;

export default Row;
