import styled from "styled-components";

const IconButton = styled.button`
    height: 3rem;
    width: 3rem;
    background-color: white;
    color: #35746d;
    border: none;
    border-radius: 50%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: ${(props: { margin?: string }) => props.margin || "0"};
`;

export default IconButton;
