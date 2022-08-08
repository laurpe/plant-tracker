import styled from "styled-components";

interface Props {
    flex?: number;
    justifyContent?: string;
    height?: string;
    padding?: string;
    position?: string;
    backgroundColor?: string;
    border?: string;
}

const Column = styled.div<Props>`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.flex || 0};
    justify-content: ${(props) => props.justifyContent || "flex-start"};
    height: ${(props) => props.height || "auto"};
    padding: ${(props) => props.padding || "0"};
    position: ${(props) => props.position || "static"};
    background-color: ${(props) => props.backgroundColor || "transparent"};
    border: ${(props) => props.border || "none"}
`;

export default Column;
