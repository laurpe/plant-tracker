import React, { useState } from "react";

import Form from "./style/Generics/Form";
import Label from "./style/Generics/Label";
import Input from "./style/Generics/Input";
import Button from "./style/Generics/Button";
import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import AppHeader from "./style/Header/AppHeader";
import AppTitle from "./style/Header/AppTitle";

import { useNavigate, Link } from "react-router-dom";

import { useUser } from "../hooks/useUser";

import { TempUser } from "../types";

import styled from "styled-components";

const StyledButton = styled(Button)`
    background-color: white;
    color: #35746d;
    font-weight: 700;
`;

const SignupDiv = styled.div`
    color: #7faaa5;
    text-align: center;
`;

const LogIn = () => {
    const [user, setUser] = useState<TempUser>({ email: "", password: "" });
    const { login } = useUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        await login(user);

        setUser({ email: "", password: "" });
        navigate("/main");
    };

    return (
        <Popup>
            <Column
                justifyContent="space-between"
                height="100%"
                padding="0 0 40px 0"
            >
                <Row justifyContent="center">
                    <AppHeader>
                        <AppTitle>plant tracker</AppTitle>
                    </AppHeader>
                </Row>
                <Form onSubmit={(event) => void handleSubmit(event)}>
                    <Label>Email</Label>
                    <Input
                        type="text"
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
                            <StyledButton type="button">Sign up</StyledButton>
                        </Link>
                    </SignupDiv>
                </Form>
            </Column>
        </Popup>
    );
};

export default LogIn;
