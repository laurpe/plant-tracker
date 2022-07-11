import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Card from "./style/Generics/Card";
import CardTitle from "./style/Generics/CardTitle";
import ButtonWater from "./style/PlantCard/ButtonWater";
import TextWater from "./style//PlantCard/TextWater";
import CardInfo from "./style/PlantCard/CardInfo";
import CardImage from "./style/PlantCard/CardImage";
import ButtonEdit from "./style/PlantCard/ButtonEdit";

import OpacityIcon from "@mui/icons-material/Opacity";
import EditIcon from "@mui/icons-material/Edit";

import Column from "./style/Generics/Column";

import styled from "styled-components";

import formatNextWatering from "../util/formatNextWatering";

dayjs.extend(utc);

const StyledCard = styled(Card)`
    margin: 16px;
    border-radius: 10px;
    position: relative;
`;

const StyledCardTitle = styled(CardTitle)`
    position: absolute;
    top: 16px;
    left: 16px;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
`;

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL as string;

interface Props {
    plant: Plant;
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    nextWatering: dayjs.Dayjs;
}

const PlantCard = ({ plant, plants, setPlants, nextWatering }: Props) => {
    const updateWatered = async (id: string): Promise<void> => {
        try {
            const response = await axios.put<Plant>(`${baseUrl}/plants/${id}`, {
                lastWatered: dayjs().utcOffset(0).startOf("date").toISOString(),
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
    //         await axios.delete<Plant>(`${baseUrl}/plants/${id}`);
    //         const plantsWithoutDeleted = plants.filter(
    //             (plant) => plant.id !== id
    //         );
    //         setPlants(plantsWithoutDeleted);
    //     } catch (error) {
    //         throw new Error("Could not delete plant");
    //     }
    // };

    return (
        <StyledCard>
            <CardImage
                src={
                    plant.imageName
                        ? `${imageBaseUrl}/${plant.imageName}`
                        : "https://as2.ftcdn.net/v2/jpg/01/85/31/71/1000_F_185317104_XmMUkvpcG2zJHLSTT2f2nTCOBrdWvwMJ.jpg"
                }
            />
            <Column flex={1}>
                <StyledCardTitle>{plant.name}</StyledCardTitle>
                <ButtonWater
                    type="button"
                    id="water-btn"
                    onClick={() => void updateWatered(plant.id)}
                >
                    <OpacityIcon sx={{ fontSize: 30 }} />
                </ButtonWater>
                <ButtonEdit
                    type="button"
                    id="edit-btn"
                    onClick={() => void updateWatered(plant.id)}
                >
                    <EditIcon sx={{ fontSize: 30 }} />
                </ButtonEdit>
                <CardInfo>
                    <TextWater>{formatNextWatering(nextWatering)}</TextWater>
                </CardInfo>
            </Column>
        </StyledCard>
    );
};

export default PlantCard;
