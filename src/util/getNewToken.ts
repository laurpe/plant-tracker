import axios from "axios";
import { User } from "../types";

export const getNewToken = async (refreshToken: string) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

    try {
        const response = await axios.post<{ token: string }>(
            `${baseUrl}/refresh`,
            refreshToken
        );
        const user = localStorage.getItem("user")
        if (typeof user === "string") {
            const storedUser = JSON.parse(user) as User;

            localStorage.setItem(
                "user",
                JSON.stringify({ ...storedUser, token: response.data.token })
            );
        }
        return response.data.token
    } catch (error) {
        localStorage.clear();
        //TODO: navigate to login page
    }
};