import styled from "styled-components";

interface Props {
    flex?: string;
    width?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
}

const Button = styled.button<Props>`
    height: 3.5rem;
    font-family: inherit;
    font-size: 1rem;
    color: white;
    background-color: ${(props) => props.backgroundColor || "#21998c"};
    border: none;
    border-radius: 5px;
    width: ${(props) => props.width || "auto"};
    flex: ${(props) => props.flex || "none"};
    padding: ${(props) => props.padding || "0"};
    margin: ${(props) => props.margin || "0"};
    align-self: center;
`;

export default Button;
