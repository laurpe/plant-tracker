import dayjs from "dayjs";

import { Plant } from "../types";
import PlantCard from "./PlantCard";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const calculateNextWatering = (plant: Plant): dayjs.Dayjs => {
    const nextWatering = dayjs(plant.lastWatered).add(
        plant.wateringCycle,
        "day"
    );

    return nextWatering;
};

const Plants = ({ plants, setPlants }: Props) => {
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
                            plants={plants}
                            setPlants={setPlants}
                            nextWatering={nextWatering}
                        />
                    );
                })}
        </>
    );
};

export default Plants;
