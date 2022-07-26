import { User, TempUser } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState<User>({ email: "", token: "" });
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

    const getToken = (): string | null => {
        const storage = localStorage.getItem("user");

        if (typeof storage === "string") {
            const user = JSON.parse(storage) as User;

            return user.token;
        }

        return null;
    };

    const setLoggedInUser = (user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    const createUser = async (user: TempUser): Promise<void> => {
        try {
            await axios.post(`${baseUrl}/users`, user);
        } catch (error) {
            throw new Error("Could not sign up");
        }
    };

    const login = async (user: TempUser) => {
        try {
            const response = await axios.post<User>(`${baseUrl}/login`, user);
            setLoggedInUser(response.data);
        } catch (error) {
            throw new Error("Could not log in");
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return { getToken, login, logout, createUser };
};
