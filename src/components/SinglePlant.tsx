import Popup from "./style/Generics/Popup";

import { Plant } from "../types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "./style/Generics/Card";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Subtitle from "./style/Generics/Subtitle";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const StyledCard = styled(Card)`
    height: 100%;
    padding: 16px;
    font-size: 1rem;
`;

const StyledColumn = styled(Column)`
    height: 100%;
    padding-bottom: 40px;
`;

const SinglePlant = () => {
    const [plant, setPlant] = useState<Plant>({
        name: "",
        growingMedium: {
            name: "",
            composition: [{ component: "", percentage: 100 }],
            id: "",
        },
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
                    <Row justifyContent="space-between">
                        <Subtitle>Plant info</Subtitle>
                        <Row>
                            <EditIcon sx={{ fontSize: 30 }} />
                            <DeleteIcon sx={{ fontSize: 30 }} />
                        </Row>
                    </Row>

                    <p>{plant.name}</p>
                    <p>{plant.growingMedium.name}</p>
                    <p>{plant.lastWatered}</p>
                    <p>{plant.wateringCycle}</p>
                </StyledColumn>
            </StyledCard>
        </Popup>
    );
};

export default SinglePlant;
