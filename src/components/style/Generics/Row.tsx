import styled from "styled-components";

interface Props {
    justifyContent?: string;
    alignItems?: string;
    padding?: string;
    border?: string;
}

const Row = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent || "start"};
    align-items: ${(props) => props.alignItems || "center"};
    padding: ${(props) => props.padding || "0"};
    border: ${(props) => props.border || "none"}
`;

export default Row;
