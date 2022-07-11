import { Link } from "react-router-dom";
import styled from "styled-components";

const TitleLink = styled(Link)`
    &:link,
    &:hover,
    &:focus,
    &:active,
    &:visited {
        color: inherit;
        text-decoration: none;
    }
`;

export default TitleLink;
