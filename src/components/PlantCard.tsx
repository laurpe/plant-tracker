import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Card from "./style/Generics/Card";
import CardTitle from "./style/PlantCard/CardTitle";
import CardButton from "./style/PlantCard/CardButton";
import TextWater from "./style//PlantCard/TextWater";
import CardInfo from "./style/PlantCard/CardInfo";
import CardImage from "./style/PlantCard/CardImage";
import TitleLink from "./style/PlantCard/TitleLink";

import OpacityIcon from "@mui/icons-material/Opacity";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import Column from "./style/Generics/Column";

import styled from "styled-components";

import formatNextWatering from "../util/formatNextWatering";

dayjs.extend(utc);

const StyledCard = styled(Card)`
    margin: 16px;
    border-radius: 10px;
    position: relative;
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
<<<<<<< HEAD
            <Row>
                <CardImage
                    src={
                        plant.imageName
                            ? `${imageBaseUrl}/${plant.imageName}`
                            : "https://as2.ftcdn.net/v2/jpg/01/85/31/71/1000_F_185317104_XmMUkvpcG2zJHLSTT2f2nTCOBrdWvwMJ.jpg"
                    }
                />
                <Column flex={1}>
                    <CardInfo>
                        <CardTitle>
                            <TitleLink to={`plants/${plant.id}`}>
                                {plant.name}
                            </TitleLink>
                        </CardTitle>
                        <ButtonWater
                            type="button"
                            id="water-btn"
                            onClick={() => void updateWatered(plant.id)}
                        >
                            <OpacityIcon sx={{ fontSize: 30 }} />
                        </ButtonWater>
                        <TextWater>
                            {formatNextWatering(nextWatering)}
                        </TextWater>
                    </CardInfo>
                </Column>
            </Row>
=======
            <CardImage
                src={
                    plant.imageName
                        ? `${imageBaseUrl}/${plant.imageName}`
                        : "https://as2.ftcdn.net/v2/jpg/01/85/31/71/1000_F_185317104_XmMUkvpcG2zJHLSTT2f2nTCOBrdWvwMJ.jpg"
                }
            />
            <Column flex={1}>
                <CardTitle>{plant.name}</CardTitle>
                <CardButton
                    type="button"
                    id="water-btn"
                    right="83px"
                    onClick={() => void updateWatered(plant.id)}
                >
                    <OpacityIcon sx={{ fontSize: 26 }} />
                </CardButton>
                <CardButton
                    type="button"
                    id="edit-btn"
                    right="16px"
                    onClick={() => void updateWatered(plant.id)}
                >
                    <ArticleOutlinedIcon sx={{ fontSize: 26 }} />
                </CardButton>
                <CardInfo>
                    <TextWater>{formatNextWatering(nextWatering)}</TextWater>
                </CardInfo>
            </Column>
>>>>>>> fadb6cdb86830da1fb06114366030d61b7859d14
        </StyledCard>
    );
};

export default PlantCard;
