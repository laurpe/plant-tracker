import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import { Plant, GrowingMedium, State } from "./types";

import { useStorage } from "./hooks/useStorage";

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
    const [growingMediums, setGrowingMediums] = useState<GrowingMedium[]>([]);

    const [storage, setStorageItems] = useStorage();

    console.log(storage);

    setStorageItems({
        plants: [
            {
                name: "growing medium should be perlite",
                growingMedium: "62c81da8eaf9abe6b26ee543",
                lastWatered: "2022-04-04T18:19:51.584Z",
                wateringCycle: 5,
                id: "62d55369d9425e57513eb7a4",
                imageName: "",
            },
        ],
        growingMediums: [
            {
                name: "leca",
                composition: [
                    {
                        component: "leca",
                        percentage: 100,
                    },
                ],
                id: "62c81d79eaf9abe6b26ee53b",
            },
        ],
    });

    console.log(storage);

    useEffect(() => {
        const fetchPlants = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };

        fetchPlants().catch(() => {
            throw new Error("Fetch plants unsuccessful");
        });

        const fetchGrowingMediums = async () => {
            const result = await getData<GrowingMedium[]>("growing-mediums");
            setGrowingMediums(result);
        };

        fetchGrowingMediums().catch(() => {
            throw new Error("Fetch growing mediums unsuccessful");
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
                    element={
                        <AddPlant
                            plants={plants}
                            setPlants={setPlants}
                            growingMediums={growingMediums}
                        />
                    }
                />
                <Route
                    path="/add-growing-medium"
                    element={
                        <AddGrowingMedium
                            growingMediums={growingMediums}
                            setGrowingMediums={setGrowingMediums}
                        />
                    }
                />
                <Route
                    path="/plants/:id"
                    element={
                        <SinglePlant
                            plants={plants}
                            setPlants={setPlants}
                            growingMediums={growingMediums}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
