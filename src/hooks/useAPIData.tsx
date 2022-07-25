import { useEffect, useState } from "react";

import { useUser } from "./useUser";

import axios from "axios";

export const useAPIData = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const { getToken } = useUser();

    const token = getToken();

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

        const config = { headers: { Authorization: `Bearer ${token || ""}` } };

        const fetchData = async () => {
            try {
                const response = await axios.get<T>(
                    `${baseUrl}/${url}`,
                    config
                );

                setData(response.data);
            } catch (error) {
                throw new Error("Could not fetch data");
            }
        };

        void fetchData();
    }, [url, token]);

    return data;
};
