import styled from "styled-components";

interface Props {
    flex?: number;
    margin?: string;
}

const Select = styled.select<Props>`
    border: none;
    border-bottom: 1px solid #b9ccca;
    font-family: inherit;
    font-size: 1.2rem;
    color: #225c55;
    padding: 0.8rem;
    height: 3.5rem;
    flex: ${(props) => props.flex || 0};
    margin: ${(props) => props.margin || "0 0 0.8rem 0"};
`;

export default Select;
