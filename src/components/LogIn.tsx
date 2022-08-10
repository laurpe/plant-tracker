import React, { useState } from "react";

import Form from "./style/Generics/Form";
import Label from "./style/Generics/Label";
import Input from "./style/Generics/Input";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import AppHeader from "./style/Header/AppHeader";
import AppTitle from "./style/Header/AppTitle";
import Notification from "./style/Generics/Notification";

import { useNavigate, Link } from "react-router-dom";

import { useUser } from "../hooks/useUser";

import { TempUser } from "../types";

import styled from "styled-components";

const StyledButton = styled(Button)`
    background-color: white;
    color: #35746d;
    font-weight: 700;
    padding-left: 1rem;
`;

const SignupDiv = styled.div`
    color: #7faaa5;
    text-align: center;
`;

const LogIn = () => {
    const [user, setUser] = useState<TempUser>({ email: "", password: "" });
    const [notification, setNotification] = useState<string>("");
    const { login } = useUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        try {
            await login(user);

            setNotification("");
            setUser({ email: "", password: "" });
            navigate("/main");
        } catch (error) {
            const err = error as Error;
            setNotification(err.message);
        }
    };

    return (
        <Column
            justifyContent="space-between"
            height="100%"
            padding="0 1rem 40px 1rem"
        >
            <Row justifyContent="center" padding="0 0 20px 0">
                <AppHeader>
                    <AppTitle>plant tracker</AppTitle>
                </AppHeader>
            </Row>
            {notification && <Notification>{notification}</Notification>}
            <Form onSubmit={(event) => void handleSubmit(event)}>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="login-email-input"
                    onChange={handleChange}
                    value={user.email}
                    required
                />
                <Label>Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="login-password-input"
                    onChange={handleChange}
                    value={user.password}
                    required
                />
                <Button type="submit" id="login-submit-btn" width="100%">
                    Log in
                </Button>
                <SignupDiv>
                    Don't have an account?
                    <Link to="/signup">
                        <StyledButton type="button" id="signup-btn">
                            Sign up
                        </StyledButton>
                    </Link>
                </SignupDiv>
            </Form>
        </Column>
    );
};

export default LogIn;
