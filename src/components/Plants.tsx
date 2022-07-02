import { Plant } from "../types";
import PlantCard from "./PlantCard";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    calculateNextWatering: (plant: Plant) => string;
}

const Plants = ({ plants, setPlants, calculateNextWatering }: Props) => {
    return (
        <>
            {plants
                .sort((a, b) => {
                    const aNextWatering = calculateNextWatering(a);
                    const bNextWatering = calculateNextWatering(b);

                    console.log("aNextWatering", aNextWatering);
                    console.log("bNextWatering", bNextWatering);

                    return -1;
                })
                .map((plant) => {
                    return (
                        <PlantCard
                            plant={plant}
                            key={plant.id}
                            plants={plants}
                            setPlants={setPlants}
                            calculateNextWatering={calculateNextWatering}
                        />
                    );
                })}
        </>
    );
};

export default Plants;
