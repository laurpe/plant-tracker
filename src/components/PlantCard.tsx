import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

interface Props {
    plant: Plant;
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const PlantCard = ({ plant, plants, setPlants }: Props) => {
    //TODO: this assumes that next watering day is in the future!
    const calculateNextWatering = (plant: Plant): string => {
        const nextWatering = dayjs(plant.lastWatered).add(
            plant.wateringCycle,
            "day"
        );
        const now = dayjs();

        const daysToNext = dayjs().to(nextWatering);

        if (nextWatering.isBefore(now)) {
            const daysMissed = dayjs().to(nextWatering, true);
            return `watering missed by ${daysMissed}`;
        }

        return `water ${daysToNext}`;
    };

    const updateWatered = async (id: string) => {
        try {
            const response = await axios.put<Plant>(`${baseUrl}plants/${id}`, {
                lastWatered: new Date().toISOString(),
            });
            const newPlant = response.data;
            const i = plants.findIndex((newPlant) => newPlant.id === id);
            const newPlants = [...plants];
            newPlants[i] = newPlant;
            setPlants(newPlants);
        } catch (error) {
            throw new Error("Could not update watering date");
        }
    };

    return (
        <div>
            <h2>{plant.name}</h2>
            <button type="button" onClick={() => void updateWatered(plant.id)}>
                water
            </button>
            <div>{calculateNextWatering(plant)}</div>
        </div>
    );
};

export default PlantCard;
