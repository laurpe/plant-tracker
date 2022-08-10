import styled from "styled-components";

interface Props {
    padding?: string;
    color?: string;
}

const Label = styled.label<Props>`
    color: ${(props) => props.color || "#7b9c99"};
    padding: ${(props) => props.padding || "0 0 0 16px"};
    font-size: 0.95rem;
`;

export default Label;
