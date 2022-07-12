import styled from "styled-components";
import IconButton from "../Generics/IconButton";

const CardButton = styled(IconButton)`
    height: 3.2rem;
    width: 3.2rem;
    background-color: #35746d;
    color: white;
    position: absolute;
    top: 90px;
    right: ${(props: { right?: string }) => props.right || "16px"};
    border: 2px solid white;
    box-shadow: none;
`;

export default CardButton;
