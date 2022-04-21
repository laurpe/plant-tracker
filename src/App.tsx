import { useEffect, useState } from "react";
import { Plant } from "./types";

const getData = async <T,>(url: string): Promise<T> => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

    const response = await fetch(`${baseUrl}${url}`);
    return response.json() as Promise<T>;
};

const App = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    console.log(plants);
    console.log(process.env.REACT_APP_API_BASE_URL);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };
        fetchData().catch((error) => console.error(error));
    }, []);

    return <div>Plant tracker</div>;
};

export default App;
