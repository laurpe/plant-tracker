import React from "react";
import styled from "styled-components";

const Notification = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background-color: #a2a2a2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    z-index: 1000;
`

const ShowNotification = () => {
    return (
        <Notification>
            New plant succesfully added!
        </Notification>
    )
}

export default ShowNotification;