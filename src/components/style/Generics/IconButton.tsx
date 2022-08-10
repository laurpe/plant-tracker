import styled from "styled-components";

interface Props {
    margin?: string;
    color?: string;
    backgroundColor?: string;
}

const IconButton = styled.button<Props>`
    height: 3rem;
    width: 3rem;
    border: none;
    border-radius: 50%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: ${(props) => props.margin || "0"};
    color: ${(props) => props.color || "#35746d"};
    background-color: ${(props) => props.backgroundColor || "white"};
`;

export default IconButton;
