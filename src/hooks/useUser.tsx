import { LoggedInUser, User } from "../types";
import axios from "axios";

export const useUser = () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

    const getLoggedInUser = (): LoggedInUser | null => {
        const storage = localStorage.getItem("user");

        if (typeof storage === "string") {
            const user = JSON.parse(storage) as LoggedInUser;

            return user;
        }

        return null;
    };

    const setLoggedInUser = (user: LoggedInUser) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    const createUser = async (user: User): Promise<void> => {
        try {
            await axios.post<User>(`${baseUrl}/users`, user);
        } catch (error) {
            throw new Error("Could not sign up");
        }
    };

    const logIn = async (user: User) => {
        try {
            const response = await axios.post<LoggedInUser>(
                `${baseUrl}/login`,
                user
            );
            console.log(response.data);
            setLoggedInUser(response.data);
        } catch (error) {
            throw new Error("Could not log in");
        }
    };

    return { getLoggedInUser, logIn, createUser };
};
