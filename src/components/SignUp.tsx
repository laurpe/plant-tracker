import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "./style/Generics/Form";
import Label from "./style/Generics/Label";
import Input from "./style/Generics/Input";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import { useUser } from "../hooks/useUser";

import { Notification, TempUser } from "../types";
import ShowNotification from "./ShowNotification";

const SignUp = () => {
    const [user, setUser] = useState<TempUser>({ email: "", password: "" });
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [notification, setNotification] = useState<Notification>(null);

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
            setNotification(null);

            try {
                await createUser(user);

                setUser({ email: "", password: "" });
                setPasswordConfirm("");

                navigate("/");
            } catch (error) {
                const err = error as Error;
                setNotification({ type: "error", message: err.message });
            }
        } else {
            setNotification({
                type: "error",
                message: "Passwords do not match",
            });
        }
    };

    return (
        <Column>
            <Row justifyContent="space-between" padding="0 0 1.2rem 1rem">
                <Title>Sign up</Title>
                <IconButton type="button" onClick={() => navigate("/")}>
                    <CloseIcon sx={{ fontSize: 26 }} />
                </IconButton>
            </Row>
            <Column padding="0 1rem 0 1rem">
                {notification && (
                    <ShowNotification notification={notification} />
                )}
                <Form onSubmit={(event) => void handleSubmit(event)}>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="signup-email-input"
                        onChange={handleChange}
                        value={user.email}
                        required
                    />
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="signup-password-input"
                        onChange={handleChange}
                        value={user.password}
                        required
                        minLength={8}
                    />
                    <Label>Confirm password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="signup-password-confirm-input"
                        onChange={handlePasswordConfirmChange}
                        value={passwordConfirm}
                        required
                        minLength={8}
                    />
                    <Button type="submit" id="signup-submit-btn" width="100%">
                        Sign up
                    </Button>
                </Form>
            </Column>
        </Column>
    );
};

export default SignUp;
