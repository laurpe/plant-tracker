import styled from "styled-components";

const Label = styled.label`
    color: ${(props: { color?: string }) => props.color || "#7b9c99"};
    padding-left: 16px;
    font-size: 0.95rem;
`;

export default Label;
