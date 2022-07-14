import styled from "styled-components";

const Label = styled.label`
    color: ${(props: { color?: string }) => props.color || "#225c55"};
`;

export default Label;
