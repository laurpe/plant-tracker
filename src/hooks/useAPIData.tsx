import { useEffect, useState } from "react";

export const useAPIData = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

        const getData = async <T,>(url: string): Promise<T> => {
            const response = await fetch(`${baseUrl}/${url}`);
            return response.json() as Promise<T>;
        };

        const fetchData = async () => {
            try {
                const result = await getData<T>(url);

                setData(result);
            } catch (error) {
                throw new Error("Could not fetch data");
            }
        };

        void fetchData();
    }, [url]);

    return data;
};
