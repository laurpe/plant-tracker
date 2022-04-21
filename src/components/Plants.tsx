import { Plant } from "../types";

const Plants = ({ plants }: { plants: Plant[] }) => {
    return (
        <div>
            {plants.map((plant) => {
                return <p>{plant.name}</p>;
            })}
        </div>
    );
};

export default Plants;
