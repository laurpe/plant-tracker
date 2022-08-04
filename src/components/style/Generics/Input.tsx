import styled from "styled-components";

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #b9ccca;
    font-family: inherit;
    font-size: 1.2rem;
    color: #225c55;
    padding: 1rem;
    width: 100%;
    appearance: none;
    min-height: 1.5rem;
    margin: ${(props: { margin?: string }) => props.margin || "0 0 0.8rem 0"};
`;

export default Input;
