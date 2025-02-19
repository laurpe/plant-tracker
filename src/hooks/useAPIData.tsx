import { useEffect, useState } from "react";

import { useUser } from "./useUser";

import { axiosPrivate } from "../util/axiosPrivate";

export const useAPIData = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL as string;

        if (user.token === "") {
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${user.token || ""}` },
        };

        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get<T>(
                    `${baseUrl}/${url}`,
                    config
                );

                setData(response.data);
            } catch (error) {
                throw new Error("Could not fetch data");
            }
        };

        void fetchData();
    }, [url, user]);

    return data;
};
