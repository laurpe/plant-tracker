import Popup from "./style/Generics/Popup";

import { Plant } from "../types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const SinglePlant = () => {
    const [plant, setPlant] = useState<Plant>({
        name: "",
        growingMedium: "",
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
            <p>{plant.name}</p>
        </Popup>
    );
};

export default SinglePlant;
