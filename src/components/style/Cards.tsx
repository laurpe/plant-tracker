import styled from "styled-components";

const Cards = styled.div`
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
`;

export default Cards;
