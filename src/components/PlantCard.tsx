import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Link } from "react-router-dom";

import Card from "./style/Generics/Card";
import CardTitle from "./style/PlantCard/CardTitle";
import CardButton from "./style/PlantCard/CardButton";
import TextWater from "./style//PlantCard/TextWater";
import CardInfo from "./style/PlantCard/CardInfo";
import CardImage from "./style/PlantCard/CardImage";

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
    updatePlant: (plant: Plant) => void;
    nextWatering: dayjs.Dayjs;
}

const PlantCard = ({ plant, updatePlant, nextWatering }: Props) => {
    const updateWatered = async (id: string): Promise<void> => {
        try {
            const response = await axios.put<Plant>(`${baseUrl}/plants/${id}`, {
                ...plant,
                lastWatered: dayjs().utcOffset(0).startOf("date").toISOString(),
            });

            updatePlant(response.data);
        } catch (error) {
            throw new Error("Could not update watering date");
        }
    };

    return (
        <StyledCard>
            <CardImage
                id="plant-image"
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
                <Link to={`/plants/${plant.id}`}>
                    <CardButton type="button" id="edit-btn" right="16px">
                        <ArticleOutlinedIcon sx={{ fontSize: 26 }} />
                    </CardButton>
                </Link>
                <CardInfo>
                    <TextWater>{formatNextWatering(nextWatering)}</TextWater>
                </CardInfo>
            </Column>
        </StyledCard>
    );
};

export default PlantCard;
