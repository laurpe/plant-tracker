import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import { useUser } from "../hooks/useUser";

import { TempUser } from "../types";

const SignUp = () => {
    const [user, setUser] = useState<TempUser>({ email: "", password: "" });
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [notification, setNotification] = useState<string>("");

    const { createUser } = useUser();

    const navigate = useNavigate();

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

        if (user.password === passwordConfirm) {
            setNotification("");

            await createUser(user);

            setUser({ email: "", password: "" });
            setPasswordConfirm("");

            navigate("/");
        } else {
            setNotification("Passwords do not match");
        }
    };

    return (
        <Popup>
            <Column
                justifyContent="space-between"
                height="100%"
                padding="0 0 40px 0"
            >
                <Row justifyContent="space-between">
                    <Title>Sign up</Title>
                    <IconButton type="button" onClick={() => navigate("/")}>
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
                <Form onSubmit={(event) => void handleSubmit(event)}>
                    {notification}
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
                        Sign up
                    </Button>
                </Form>
            </Column>
        </Popup>
    );
};

export default SignUp;
