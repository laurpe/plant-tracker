import React, { useState } from "react";

import Form from "./style/Generics/Form";
import Label from "./style/Generics/Label";
import Input from "./style/Generics/Input";
import Button from "./style/Generics/Button";

import { User } from "../types";

import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const SignUp = () => {
    const [user, setUser] = useState<User>({ username: "", password: "" });
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [notification, setNotification] = useState<string>("");

    const addUser = async (user: User) => {
        try {
            const response = await axios.post<User>(`${baseUrl}/signup`, user);
            console.log(response.data);
        } catch (error) {
            throw new Error("Could not sign up");
        }
    };

    const passwordsMatch = (password1: string, password2: string) => {
        return password1 === password2;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handlePasswordConfirmChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        if (passwordsMatch(user.password, passwordConfirm)) {
            setNotification("");
            await addUser(user);

            setUser({ username: "", password: "" });
        }
        setNotification("Passwords do not match");
    };

    return (
        <Form onSubmit={(event) => void handleSubmit(event)}>
            {notification}
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
            <Label>Confirm password</Label>
            <Input
                type="password"
                name="password"
                id="login-password-confirm-input"
                onChange={handlePasswordConfirmChange}
                value={passwordConfirm}
                required
            />
            <Button type="submit" id="submit-btn" width="100%">
                Save
            </Button>
        </Form>
    );
};

export default SignUp;
