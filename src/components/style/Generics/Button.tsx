import styled from "styled-components";

const Button = styled.button`
    height: 3.5rem;
    font-family: inherit;
    font-size: 1rem;
    color: white;
    background-color: #21998c;
    border: none;
    border-radius: 5px;
    width: ${(props: { width?: string }) => props.width || "auto"};
    align-self: center;
`;

export default Button;
