import { Plant } from "../types";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Link } from "react-router-dom";

import OpacityIcon from "@mui/icons-material/Opacity";

import Row from "./style/Generics/Row";

import styled from "styled-components";

import formatNextWatering from "../util/formatNextWatering";

import { useUser } from "../hooks/useUser";

dayjs.extend(utc);

const Card = styled.div`
    position: relative;
    margin-bottom: 16px;
    border-radius: 10px;
    background-image: url(${(props: { url?: string }) => props.url});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 32vh;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0.5px;
`;

const Header = styled(Row)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
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
    z-index: 100;
`

const CardTitle = styled.h2`
    color: white;
    font-weight: 700;
    font-size: 1.3rem;
    text-shadow: 0.5px 0.5px 4px rgb(0, 0, 0, 0.6);
    letter-spacing: 1px;
    text-transform: capitalize;
`;

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

        <Card id="plant-card" url={plant.imageName ? `${imageBaseUrl}/${plant.imageName}` : "http://source.unsplash.com/WS5yjFjycNY"}>
            <Link id="plant-edit-link" to={`/plants/${plant.id}`}>
                <LinkArea />
            </Link>
            <Header background="linear-gradient(to bottom, #25252591, #00000000)" justifyContent="space-between" padding="1rem 0.5rem 0 1rem">
                <CardTitle>{plant.name}</CardTitle>
                <WaterButton type="button" id="water-btn" onClick={() => void updateWatered(plant.id)}><OpacityIcon sx={{ fontSize: 42 }} /></WaterButton>
            </Header>
            <WateringText>
                {formatNextWatering(nextWatering)}
            </WateringText>
        </Card>
    );
};

export default PlantCard;
