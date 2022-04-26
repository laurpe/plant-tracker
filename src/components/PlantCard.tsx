import { Plant } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

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

    const updateWatered = async (id: string) => {
        try {
            await fetch(`${baseUrl}plants/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lastWatered: new Date().toISOString(),
                }),
            });
        } catch (error: unknown) {
            throw new Error();
        }
    };

    return (
        <div>
            <h2>{plant.name}</h2>
            <button type="button" onClick={() => void updateWatered(plant.id)}>
                water
            </button>
            <div>water {calculateNextWatering(plant)}</div>
        </div>
    );
};

export default PlantCard;

//TODO: update watering to local state
