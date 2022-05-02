import { Plant } from "../types";
import PlantCard from "./PlantCard";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const Plants = ({ plants, setPlants }: Props) => {
    return (
        <div>
            {plants.map((plant) => {
                return (
                    <PlantCard
                        plant={plant}
                        key={plant.id}
                        plants={plants}
                        setPlants={setPlants}
                    />
                );
            })}
        </div>
    );
};

export default Plants;
