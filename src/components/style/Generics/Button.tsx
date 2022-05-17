import styled from "styled-components";

const Button = styled.button`
    height: 3rem;
    font-family: inherit;
    font-size: inherit;
    text-transform: uppercase;
    color: white;
    font-weight: 700;
    letter-spacing: 2px;
    background-color: #9ecfc6;
    border: none;
    border-radius: 5px;
    padding: 0.8rem;
    width: ${(props: { width?: string }) => props.width || "auto"};
`;

export default Button;
