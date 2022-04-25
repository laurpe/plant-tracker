import { Plant } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const PlantCard = ({ plant }: { plant: Plant }) => {
    const calculateNextWatering = (plant: Plant): string => {
        const nextWatering = dayjs(plant.lastWatered).add(
            plant.wateringCycle,
            "day"
        );
        const daysToNext = dayjs().to(nextWatering);
        return daysToNext;
    };
    // const updateLastWatered = (plant): void => {

    // }

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

//TODO: water button to update last watering date -> also need to update "water in whatever days" view
