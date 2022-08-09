import styled from "styled-components";

interface Props {
    flex?: number;
    width?: string;
    padding?: string;
}

const Button = styled.button<Props>`
    height: 3.5rem;
    font-family: inherit;
    font-size: 1rem;
    color: white;
    background: #21998c;
    border: none;
    border-radius: 5px;
    width: ${(props) => props.width || "auto"};
    flex: ${(props) => props.flex || 0};
    padding: ${(props) => props.padding || "0"};
    align-self: center;
`;

export default Button;