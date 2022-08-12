import React from "react";
import styled from "styled-components";

import { Notification } from "../types";

const NotificationDiv = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0.5px;
`;

interface Props {
    notification: Notification;
}

const ShowNotification = ({ notification }: Props) => {
    return <NotificationDiv>{notification.message}</NotificationDiv>;
};

export default ShowNotification;
