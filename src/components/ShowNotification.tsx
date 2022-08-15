import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { Notification } from "../types";

const animation = keyframes`
    0% {
        height: 0;
    }
    20% {
        height: 80px;
    }
    80% {
        height: 80px;
    }
    100% {
        height: 0;
    }
`;

const NotificationDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0.5px;
    animation-name: ${animation};
    animation-duration: 5s;
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

    return <NotificationDiv>{notification?.message}</NotificationDiv>;
};

export default ShowNotification;
