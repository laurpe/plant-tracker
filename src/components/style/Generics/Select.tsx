import styled from "styled-components";

interface Props {
    flex?: number;
    margin?: string;
}

const Select = styled.select<Props>`
    border: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: inherit;
    color: #225c55;
    padding: 0.75rem;
    background-color: rgb(235, 243, 241);
    height: 2.85rem;
    flex: ${(props) => props.flex || 0};
    margin: ${(props) => props.margin || "0 0 0.8rem 0"};
`;

export default Select;
