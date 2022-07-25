import { useEffect, useState } from "react";

import axios from "axios";

export const useAPIData = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

        const fetchData = async () => {
            try {
                const response = await axios.get<T>(`${baseUrl}/${url}`);

                setData(response.data);
            } catch (error) {
                throw new Error("Could not fetch data");
            }
        };

        void fetchData();
    }, [url]);

    return data;
};
