import dayjs from "dayjs";

import { Plant } from "../types";
import PlantCard from "./PlantCard";
import { usePlants } from "../hooks/usePlants";

const calculateNextWatering = (plant: Plant): dayjs.Dayjs => {
    const nextWatering = dayjs(plant.lastWatered).add(
        plant.wateringCycle,
        "day"
    );

    return nextWatering;
};

const Plants = () => {
    const { plants } = usePlants();
    return (
        <>
            {plants
                .sort((a, b) => {
                    const aNextWatering = calculateNextWatering(a);
                    const bNextWatering = calculateNextWatering(b);

                    return aNextWatering.isBefore(bNextWatering) ? -1 : 1;
                })
                .map((plant) => {
                    const nextWatering = calculateNextWatering(plant);
                    return (
                        <PlantCard
                            plant={plant}
                            key={plant.id}
                            nextWatering={nextWatering}
                        />
                    );
                })}
        </>
    );
};

export default Plants;
