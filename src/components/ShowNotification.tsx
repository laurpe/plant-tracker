import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { Notification } from "../types";

const animation = keyframes`
    0% {
        height: 0;
    }
    20% {
        height: 120px;
    }
    80% {
        height: 120px;
    }
    100% {
        height: 0;
    }
`;

interface NotificationProps {
    type?: string;
}

const NotificationDiv = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    display: flex;
    font-size: 1rem;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 2px;
    animation-name: ${animation};
    animation-duration: 5s;
    color: #7b9c99;
    background-color: white;
`;

const SideDiv = styled.div<NotificationProps>`
    width: 6px;
    height: 100%;
    margin-right: 16px;
    background-color: ${(props) => {
        if (props.type === "notification") {
            return "#21998c";
        }
        if (props.type === "error") {
            return "#ea5c5c";
        }
    }};
`;

const StyledP = styled.p`
    padding-top: 30px;
`;

interface Props {
    notification: Notification;
}

const ShowNotification = ({ notification }: Props) => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
            setVisible(true);
        };
    }, [notification]);

    if (!visible) {
        return null;
    }

    return (
        <NotificationDiv id="notification-container">
            <SideDiv type={notification?.type} />
            <StyledP>{notification?.message}</StyledP>
        </NotificationDiv>
    );
};

export default ShowNotification;
