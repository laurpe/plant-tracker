import { Plant } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const PlantCard = ({ plant }: { plant: Plant }) => {
    //TODO: this assumes that next watering day is in the future!
    const calculateNextWatering = (plant: Plant): string => {
        const nextWatering = dayjs(plant.lastWatered).add(
            plant.wateringCycle,
            "day"
        );
        const daysToNext = dayjs().to(nextWatering);
        return daysToNext;
    };

    return (
        <div>
            <h2>{plant.name}</h2>
            <button type="button">water</button>
            <div>water {calculateNextWatering(plant)}</div>
        </div>
    );
};

export default PlantCard;

//TODO: water button to update last watering date -> also need to update "water in whatever days" view
