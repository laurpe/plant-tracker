import styled from "styled-components";

interface Props {
    flex?: number;
    justifyContent?: string;
    height?: string;
    padding?: string;
}

const Column = styled.div<Props>`
    display: flex;
    flex-direction: column;
    flex: ${(props) => props.flex || 0};
    justify-content: ${(props) => props.justifyContent || "flex-start"};
    height: ${(props) => props.height || "auto"};
    padding-bottom: ${(props) => props.padding || "0"};
`;

export default Column;
