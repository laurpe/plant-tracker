import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Link } from "react-router-dom";

import Card from "./style/Generics/Card";
import CardTitle from "./style/PlantCard/CardTitle";

import OpacityIcon from "@mui/icons-material/Opacity";

import Row from "./style/Generics/Row";

import styled from "styled-components";

import formatNextWatering from "../util/formatNextWatering";

import { useUser } from "../hooks/useUser";

dayjs.extend(utc);

const StyledCard = styled(Card)`
    position: relative;
    margin-bottom: 16px;
    border-radius: 10px;
    background-image: url(${(props: { url?: string }) => props.url});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 32vh;
`;

const StyledRow = styled(Row)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background: ${(props: { background?: string }) => props.background || "none"};
    align-items: flex-start;
    border-radius: 10px 10px 0 0;
`

const WaterButton = styled.button`
    height: 3rem;
    width: 3rem;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    background-color: transparent;
    color: white;
    z-index: 500;
`

const WateringText = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    color: #7b9c99;
    background-color: white;
    border-radius: 10px;
    padding: 1rem;
    width: 100%;
`

const LinkArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 80%;
`

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL as string;

interface Props {
    plant: Plant;
    updatePlant: (plant: Plant) => void;
    nextWatering: dayjs.Dayjs;
}

const PlantCard = ({ plant, updatePlant, nextWatering }: Props) => {
    const { user } = useUser();

    const updateWatered = async (id: string): Promise<void> => {
        try {
            const response = await axios.put<Plant>(
                `${baseUrl}/plants/${id}`,
                {
                    ...plant,
                    lastWatered: dayjs()
                        .utcOffset(0)
                        .startOf("date")
                        .toISOString(),
                },
                {
                    headers: { Authorization: `Bearer ${user.token || ""}` },
                }
            );

            updatePlant(response.data);
        } catch (error) {
            throw new Error("Could not update watering date");
        }
    };

    return (

        <StyledCard url={plant.imageName ? `${imageBaseUrl}/${plant.imageName}` : "http://source.unsplash.com/WS5yjFjycNY"}>
            <Link to={`/plants/${plant.id}`}>
                <LinkArea />
            </Link>
            <StyledRow background="linear-gradient(to bottom, #25252591, #00000000)" justifyContent="space-between" padding="1rem 0.5rem 0 1rem">
                <CardTitle>{plant.name}</CardTitle>
                <WaterButton type="button" id="water-btn" onClick={() => void updateWatered(plant.id)}><OpacityIcon sx={{ fontSize: 42 }} /></WaterButton>
            </StyledRow>
            <WateringText>
                {formatNextWatering(nextWatering)}
            </WateringText>
        </StyledCard>
    );
};

export default PlantCard;
