import { useState } from "react";

import Form from "./style/Generics/Form";
import Label from "./style/Generics/Label";
import Input from "./style/Generics/Input";
import Button from "./style/Generics/Button";

import { User } from "../types";

import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const SignUp = () => {
    const [user, setUser] = useState<User>({ username: "", password: "" });

    const addUser = async (user: User) => {
        try {
            const response = await axios.post<User>(`${baseUrl}/login`, user);
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

        await addUser(user);

        setUser({ username: "", password: "" });
    };

    return (
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
                Save
            </Button>
        </Form>
    );
};

export default SignUp;
