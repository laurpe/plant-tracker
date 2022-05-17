import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "./style/Generics/Card";
import CardTitle from "./style/Generics/CardTitle";
import ButtonWater from "./style/PlantCard/ButtonWater";
import TextWater from "./style//PlantCard/TextWater";
import CardInfo from "./style/PlantCard/CardInfo";
import CardImage from "./style/PlantCard/CardImage";

import OpacityIcon from "@mui/icons-material/Opacity";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";

dayjs.extend(relativeTime);

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

interface Props {
    plant: Plant;
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const PlantCard = ({ plant, plants, setPlants }: Props) => {
    const calculateNextWatering = (plant: Plant): string => {
        const nextWatering = dayjs(plant.lastWatered).add(
            plant.wateringCycle,
            "day"
        );
        const now = dayjs();

        const daysToNext = dayjs().to(nextWatering);

        if (nextWatering.isBefore(now)) {
            const daysMissed = dayjs().to(nextWatering, true);
            return `watering late by ${daysMissed}`;
        }

        return `water ${daysToNext}`;
    };

    const updateWatered = async (id: string): Promise<void> => {
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

    // const handleDelete = async (id: string): Promise<void> => {
    //     try {
    //         await axios.delete<Plant>(`${baseUrl}plants/${id}`);
    //         const plantsWithoutDeleted = plants.filter(
    //             (plant) => plant.id !== id
    //         );
    //         setPlants(plantsWithoutDeleted);
    //     } catch (error) {
    //         throw new Error("Could not delete plant");
    //     }
    // };

    //row and column component for flexbox structuring
    return (
        <Card>
            <Row>
                <CardImage src="https://as2.ftcdn.net/v2/jpg/01/85/31/71/1000_F_185317104_XmMUkvpcG2zJHLSTT2f2nTCOBrdWvwMJ.jpg" />
                <Column flex={1}>
                    <CardInfo>
                        <CardTitle>
                            {plant.name}{" "}
                            {/* <button
                    type="button"
                    onClick={() => void handleDelete(plant.id)}
                >
                    delete
                </button> */}
                        </CardTitle>
                        <ButtonWater
                            type="button"
                            id="water-btn"
                            onClick={() => void updateWatered(plant.id)}
                        >
                            <OpacityIcon sx={{ fontSize: 30 }} />
                        </ButtonWater>
                        <TextWater>{calculateNextWatering(plant)}</TextWater>
                    </CardInfo>
                </Column>
            </Row>
        </Card>
    );
};

export default PlantCard;
