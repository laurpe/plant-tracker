import { Plant } from "../types";
import { useState, useEffect } from "react";

const useFetchPlants = () => {
    const [plants, setPlants] = useState<Plant[]>([]);

    const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

    const getData = async <T>(url: string): Promise<T> => {
        const response = await fetch(url);
        return response.json() as Promise<T>;
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData<Plant[]>(`${baseUrl}plants`);
            setPlants(result);
        };
        fetchData().catch((error) => {
            throw new Error();
        });
    }, [baseUrl]);

    return plants;
};

export default useFetchPlants;
