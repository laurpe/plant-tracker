import { useEffect, useState } from "react";
import { Plant } from "./types";
import Plants from "./components/Plants";

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
        fetchData().catch((error) => console.error(error));
    }, []);

    console.log(plants);

    return <Plants plants={plants} />;
};

export default App;
