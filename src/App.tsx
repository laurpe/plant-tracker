import { useEffect, useState } from "react";
import { Plant } from "./types";

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url);
    return response.json() as Promise<T>;
};

const App = () => {
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData<Plant[]>("plantData.json");
            setPlants(result);
        };
        fetchData().catch((error) => console.error(error));
    }, []);

    return <div>sdfsdf</div>;
};

export default App;
