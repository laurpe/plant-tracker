import styled from "styled-components";

const Button = styled.button`
    height: 3.5rem;
    font-family: inherit;
    font-size: 1rem;
    color: white;
    font-weight: 700;
    letter-spacing: 2px;
    background-color: #35746d;
    border: none;
    border-radius: 5px;
    padding: 0.8rem;
    width: ${(props: { width?: string }) => props.width || "auto"};
`;

export default Button;
