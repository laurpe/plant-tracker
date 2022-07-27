import { User, TempUser } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export const useUser = () => {
    const [user, setUser] = useState<User>({ email: "", token: "" });

    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

    useEffect(() => {
        const storage = localStorage.getItem("user");

        if (typeof storage === "string") {
            const storedUser = JSON.parse(storage) as User;

            setUser(storedUser);
        }
    }, []);

    const createUser = async (user: TempUser): Promise<void> => {
        try {
            await axios.post(`${baseUrl}/users`, user);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ error: string }>;

                throw new Error(err.response?.data.error);
            }
            throw error;
        }
    };

    const login = async (user: TempUser) => {
        try {
            const response = await axios.post<User>(`${baseUrl}/login`, user);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
        } catch (error) {
            throw new Error("Could not log in");
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return { user, login, logout, createUser };
};
