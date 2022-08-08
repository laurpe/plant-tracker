import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import { TempPlant, Plant } from "../types";

import axios from "axios";

import { usePlants } from "../hooks/usePlants";

import PlantForm from "./PlantForm";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imgUploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_API_BASE_URL as string;

const AddPlant = () => {
    // states

    const [plant, setPlant] = useState<TempPlant>({
        name: "",
        growingMedium: "",
        lastWatered: new Date().toISOString().substring(0, 10),
        wateringCycle: 0,
        imageName: "",
    });
    const [uploading, setUploading] = useState<boolean>(false);

    const { addPlant } = usePlants();

    const { user } = useUser();

    const navigate = useNavigate();

    // add plant to database

    const add = async (plant: TempPlant): Promise<void> => {
        try {
            const response = await axios.post<Plant>(
                `${baseUrl}/plants`,
                plant,
                { headers: { Authorization: `Bearer ${user.token || ""}` } }
            );

            addPlant(response.data);
        } catch (error) {
            throw new Error("Could not add plant");
        }
    };

    // form functions

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (
            event.target.name === "growingMedium" &&
            event.target.value === "create new"
        ) {
            navigate("/add-growing-medium");
        }
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
            lastWatered: new Date(plant.lastWatered).toISOString(),
        };

        setPlant(plantCopy);

        await add(plantCopy);

        setPlant({
            name: "",
            growingMedium: "",
            lastWatered: "2022-07-07",
            wateringCycle: 0,
            imageName: "",
        });

        navigate("/main");
    };

    const handleImageRemove = () => {
        setPlant({ ...plant, imageName: "" });
    };

    return (
        <PlantForm
            handleSubmit={(event) => void handleSubmit(event)}
            handleChange={handleChange}
            handleImageChange={(event) => void handleImageChange(event)}
            handleImageRemove={handleImageRemove}
            plant={plant}
            uploading={uploading}
        />
    );
};

export default AddPlant;
