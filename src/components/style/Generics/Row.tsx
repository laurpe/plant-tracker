import styled from "styled-components";

interface Props {
    justifyContent?: string;
    alignItems?: string;
}

const Row = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent || "start"};
    align-items: ${(props) => props.alignItems || "center"};
`;

export default Row;
