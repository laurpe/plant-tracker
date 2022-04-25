import { Plant } from "../types";
import { addDays, formatDistance, parseISO } from "date-fns";

const PlantCard = ({ plant }: { plant: Plant }) => {
    const calculateNextWatering = (plant: Plant): string => {
        const nextWatering = addDays(
            parseISO("2022-04-25T03:57:02.647Z"),
            plant.wateringCycle
        );
        return formatDistance(new Date(), nextWatering);
    };

    // const updateLastWatered = (plant): void => {

    // }

    return (
        <>
            <div>
                <h2>{plant.name}</h2>
                <button type="button">water</button>
            </div>
            <div>water in {calculateNextWatering(plant)}</div>
        </>
    );
};

export default PlantCard;

//TODO: water button to update last watering date -> also need to update "water in whatever days" view
