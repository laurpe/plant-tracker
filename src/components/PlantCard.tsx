import { Plant } from "../types";
import moment from "moment";

const PlantCard = ({ plant }: { plant: Plant }) => {
    const calculateNextWatering = (plant: Plant): string => {
        const start = moment();
        const end = moment(plant.lastWatered).add(plant.wateringCycle, "days");
        return end.from(start);
    };

    return (
        <>
            <div>
                <h2>{plant.name}</h2>
                <button type="button">water</button>
            </div>
            <div>water {calculateNextWatering(plant)}</div>
        </>
    );
};

export default PlantCard;
