import styled from "styled-components";

const Card = styled.div`
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm-exjqx0Fl1nEDgAmjO8O5l-6w8peEiPgdA&usqp=CAU");
        filter: hue-rotate(20deg) saturate(200%) opacity(60%);
        border-radius: 10px;
    }
    position: relative;
    aspect-ratio: 1;
    border-radius: 10px;
    padding: 1rem;
    min-height: 136px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export default Card;
