import { Plant } from "../types";
import PlantCard from "./PlantCard";

const Plants = ({ plants }: { plants: Plant[] }) => {
    return (
        <div>
            {plants.map((plant) => {
                return <PlantCard plant={plant} key={plant.id} />;
            })}
        </div>
    );
};

export default Plants;
