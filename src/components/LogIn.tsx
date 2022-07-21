import React, { useState } from "react";

import Form from "./style/Generics/Form";
import Label from "./style/Generics/Label";
import Input from "./style/Generics/Input";
import Button from "./style/Generics/Button";
import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

import { User, LoggedInUser } from "../types";

import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const LogIn = () => {
    const [user, setUser] = useState<User>({ username: "", password: "" });

    const navigate = useNavigate();

    const logIn = async (user: User) => {
        try {
            const response = await axios.post<LoggedInUser>(
                `${baseUrl}/login`,
                user
            );
            console.log(response.data);
        } catch (error) {
            throw new Error("Could not log in");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        await logIn(user);

        setUser({ username: "", password: "" });
    };

    return (
        <Popup>
            <Column
                justifyContent="space-between"
                height="100%"
                padding="0 0 40px 0"
            >
                <Row justifyContent="space-between">
                    <Title>Login</Title>
                    <IconButton type="button" onClick={() => navigate("/")}>
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
                <Form onSubmit={(event) => void handleSubmit(event)}>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="login-username-input"
                        onChange={handleChange}
                        value={user.username}
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
                    <Button type="submit" id="submit-btn" width="100%">
                        Log in
                    </Button>
                </Form>
            </Column>
        </Popup>
    );
};

export default LogIn;
