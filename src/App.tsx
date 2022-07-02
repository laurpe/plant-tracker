import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Plant } from "./types";

import Plants from "./components/Plants";
import AddPlantForm from "./components/AddPlantForm";
import Header from "./components/Header";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

dayjs.extend(relativeTime);

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const calculateNextWatering = (plant: Plant): string => {
    const nextWatering = dayjs(plant.lastWatered).add(
        plant.wateringCycle,
        "day"
    );
    const now = dayjs();

    const daysToNext = dayjs().to(nextWatering);

    if (nextWatering.isBefore(now)) {
        const daysMissed = dayjs().to(nextWatering, true);
        return `watering late by ${daysMissed}`;
    }

    return `water ${daysToNext}`;
};

const App = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [toggleAddPlantForm, setToggleAddPlantForm] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };
        fetchData().catch(() => {
            throw new Error("Fetch plants unsuccessful");
        });
    }, []);

    const handleToggleFormClick = (): void => {
        setToggleAddPlantForm(!toggleAddPlantForm);
    };

    return (
        <>
            <Header handleToggleFormClick={handleToggleFormClick} />
            {toggleAddPlantForm && (
                <AddPlantForm
                    plants={plants}
                    setPlants={setPlants}
                    handleToggleFormClick={handleToggleFormClick}
                    setToggleAddPlantForm={setToggleAddPlantForm}
                />
            )}
            <Plants
                plants={plants}
                setPlants={setPlants}
                calculateNextWatering={calculateNextWatering}
            />
        </>
    );
};

export default App;
