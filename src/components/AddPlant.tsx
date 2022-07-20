import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TempPlant, Plant } from "../types";

import axios from "axios";

import Title from "./style/Generics/Title";
import Row from "./style/Generics/Row";
import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";
import IconButton from "./style/Generics/IconButton";

import PlantForm from "./PlantForm";

import CloseIcon from "@mui/icons-material/Close";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imgUploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_API_BASE_URL as string;

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const AddPlant = ({ plants, setPlants }: Props) => {
    // states

    const [plant, setPlant] = useState<TempPlant>({
        name: "",
        growingMedium: "",
        lastWatered: new Date().toISOString().substring(0, 10),
        wateringCycle: 0,
        imageName: "",
    });
    const [uploading, setUploading] = useState<boolean>(false);

    const navigate = useNavigate();

    // add plant to database

    const addPlant = async (plant: TempPlant): Promise<void> => {
        try {
            const response = await axios.post<Plant>(
                `${baseUrl}/plants`,
                plant
            );
            setPlants([...plants, response.data]);
        } catch (error) {
            throw new Error("Could not add plant");
        }
    };

    // form functions

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPlant({ ...plant, [event.target.name]: event.target.value });
    };

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        if (event.target.files) {
            setUploading(true);
            const image = event.target.files[0];

            const config = { headers: { "Content-Type": "image/jpeg" } };

            try {
                const response = await axios.post<{
                    [key: string]: string;
                }>(`${imgUploadUrl}/upload`, image, config);
                setPlant({ ...plant, imageName: response.data.imgName });
            } catch (error) {
                throw new Error("Could not upload image");
            }
            setUploading(false);
        }
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const plantCopy = {
            ...plant,
        };
        plantCopy.lastWatered = new Date(plant.lastWatered).toISOString();

        setPlant(plantCopy);
        await addPlant(plantCopy);
        setPlant({
            name: "",
            growingMedium: "",
            lastWatered: "2022-07-07",
            wateringCycle: 0,
            imageName: "",
        });
        navigate("/");
    };

    const handleImageRemove = () => {
        setPlant({ ...plant, imageName: "" });
    };

    return (
        <Popup>
            <Column
                justifyContent="space-between"
                height="100%"
                padding="0 0 40px 0"
            >
                <Row justifyContent="space-between">
                    <Title>Add plant</Title>
                    <IconButton type="button" onClick={() => navigate("/")}>
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
                <PlantForm
                    handleSubmit={(event) => void handleSubmit(event)}
                    handleChange={handleChange}
                    handleImageChange={(event) => void handleImageChange(event)}
                    handleImageRemove={handleImageRemove}
                    plant={plant}
                    uploading={uploading}
                />
            </Column>
        </Popup>
    );
};

export default AddPlant;
