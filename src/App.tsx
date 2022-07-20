import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import { Plant } from "./types";

import Main from "./components/Main";
import SinglePlant from "./components/SinglePlant";
import AddPlant from "./components/AddPlant";
import AddGrowingMedium from "./components/AddGrowingMedium";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const App = () => {
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        const fetchPlants = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };

        fetchPlants().catch(() => {
            throw new Error("Fetch plants unsuccessful");
        });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Main plants={plants} setPlants={setPlants} />}
                />
                <Route
                    path="/add"
                    element={<AddPlant plants={plants} setPlants={setPlants} />}
                />
                <Route
                    path="/add-growing-medium"
                    element={<AddGrowingMedium />}
                />
                <Route
                    path="/plants/:id"
                    element={
                        <SinglePlant plants={plants} setPlants={setPlants} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
