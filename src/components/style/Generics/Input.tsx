import styled from "styled-components";

const Input = styled.input`
    border: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: inherit;
    color: #225c55;
    padding: 0.8rem;
    width: 100%;
    background-color: rgb(235, 243, 241);
    appearance: none;
    min-height: 1.5rem;
    margin: ${(props: { margin?: string }) => props.margin || "0 0 0.8rem 0"};
`;

export default Input;
