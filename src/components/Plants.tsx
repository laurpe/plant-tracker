import { Plant } from "../types";
import PlantCard from "./PlantCard";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const Plants = ({ plants, setPlants }: Props) => {
    return (
        <ul>
            {plants.map((plant) => {
                return (
                    <li key={plant.id}>
                        <PlantCard
                            plant={plant}
                            key={plant.id}
                            plants={plants}
                            setPlants={setPlants}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default Plants;
