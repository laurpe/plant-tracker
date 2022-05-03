import { useEffect, useState } from "react";
import { Plant } from "./types";
import Plants from "./components/Plants";
import React from "react";
import AddPlantForm from "./components/AddPlantForm";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${url}`);
    return response.json() as Promise<T>;
};

const App = () => {
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };
        fetchData().catch(() => {
            throw new Error("Fetch plants unsuccessful");
        });
    }, []);

    return (
        <>
            <AddPlantForm plants={plants} setPlants={setPlants} />
            <Plants plants={plants} setPlants={setPlants} />
        </>
    );
};

export default App;
