import styled from "styled-components";

interface Props {
    justifyContent?: string;
    alignItems?: string;
    padding?: string;
    border?: string;
    margin?: string;
    background?: string;
}

const Row = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent || "start"};
    align-items: ${(props) => props.alignItems || "center"};
    padding: ${(props) => props.padding || "0"};
    border: ${(props) => props.border || "none"};
    margin: ${(props) => props.margin || "0"};
    background: ${(props) => props.background || "none"};
`;

export default Row;
