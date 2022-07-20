import { useEffect, useState } from "react";

import { Plant } from "../types";
import { useAPIData } from "./useAPIData";

export const usePlants = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const data = useAPIData<Plant[]>("plants");

    useEffect(() => {
        if (data) {
            setPlants(data);
        }
    }, [data]);

    const addPlant = (plant: Plant) => {
        setPlants([...plants, plant]);
    };

    const removePlant = (id: string) => {
        const plantsToKeep = plants.filter((item) => item.id !== id);

        setPlants(plantsToKeep);
    };

    const updatePlant = (plant: Plant) => {
        const i = plants.findIndex((item) => item.id === plant.id);

        const plantsCopy = [...plants];
        plantsCopy[i] = plant;

        setPlants(plantsCopy);
    };

    console.log(plants);

    return { plants, addPlant, removePlant, updatePlant };
};
