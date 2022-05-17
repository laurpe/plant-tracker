import styled from "styled-components";

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${(props: { flex?: number }) => props.flex || 0};
`;

export default Column;
