import axios, { AxiosError } from "axios";
import { User } from "../types";
import { getNewToken } from "./getNewToken";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const config = error?.config;

        if (error?.response?.status === 401) {
            const user = localStorage.getItem("user");
            if (typeof user === "string") {
                const storedUser = JSON.parse(user) as User;

                const newToken = await getNewToken(storedUser.refreshToken);

                if (newToken) {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${newToken}`,
                    };
                }
            }
            return axios(config);
        }
        return Promise.reject(error);
    }
);

export const axiosPrivate = axios;
