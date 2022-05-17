import { Plant } from "../types";
import PlantCard from "./PlantCard";
import Cards from "./style/PlantCard/Cards";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

//TODO: sort plants so that the one needing watering the most is on the top!

const Plants = ({ plants, setPlants }: Props) => {
    return (
        <Cards>
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
        </Cards>
    );
};

export default Plants;
