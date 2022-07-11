import Popup from "./style/Generics/Popup";

import { Plant } from "../types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "./style/Generics/Card";
import Column from "./style/Generics/Column";
import Subtitle from "./style/Generics/Subtitle";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const StyledCard = styled(Card)`
    height: 100%;
`;

const StyledColumn = styled(Column)`
    height: 100%;
    padding-bottom: 40px;
`;

const SinglePlant = () => {
    const [plant, setPlant] = useState<Plant>({
        name: "",
        growingMedium: { name: "", composition: [], id: "" },
        lastWatered: "",
        wateringCycle: 0,
        imageName: "",
        id: "",
    });
    const id = useParams().id as string;

    useEffect(() => {
        const fetchPlant = async () => {
            const result = await getData<Plant>(`plants/${id}`);
            setPlant(result);
        };

        fetchPlant().catch(() => {
            throw new Error("Fetch plant unsuccessful");
        });
    }, [id]);

    return (
        <Popup>
            <StyledCard>
                <StyledColumn>
                    <Subtitle>Plant info</Subtitle>
                    <p>{plant.name}</p>
                    <p>{plant.growingMedium?.name}</p>
                    <p>{plant.lastWatered}</p>
                    <p>{plant.wateringCycle}</p>
                </StyledColumn>
            </StyledCard>
        </Popup>
    );
};

export default SinglePlant;
