import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import { TempPlant, Plant, Notification } from "../types";

import { axiosPrivate } from "../util/axiosPrivate";

import { usePlants } from "../hooks/usePlants";

import PlantForm from "./PlantForm";
import ShowNotification from "./ShowNotification";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL as string;
const imgUploadUrl = import.meta.env
    .VITE_APP_IMAGE_UPLOAD_API_BASE_URL as string;

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
    const [notification, setNotification] = useState<Notification>(null);

    const [addNewGrowingMedium, setAddNewGrowingMedium] =
        useState<boolean>(false);

    const hideGrowingMediumForm = () => {
        setAddNewGrowingMedium(false);
    };

    const { addPlant } = usePlants();

    const { user } = useUser();

    const navigate = useNavigate();

    // add plant to database

    const add = async (plant: TempPlant): Promise<void> => {
        try {
            const response = await axiosPrivate.post<Plant>(
                `${baseUrl}/plants`,
                plant,
                { headers: { Authorization: `Bearer ${user.token || ""}` } }
            );

            addPlant(response.data);
        } catch (error) {
            setNotification({
                type: "error",
                message: "Could not add plant, try again",
            });
        }
    };

    // form functions

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (
            event.target.name === "growingMedium" &&
            event.target.value === "create new"
        ) {
            event.target.value = "";
            setAddNewGrowingMedium(true);
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
                const response = await axiosPrivate.post<{
                    [key: string]: string;
                }>(`${imgUploadUrl}/upload`, image, config);
                setPlant({ ...plant, imageName: response.data.imgName });
            } catch (error) {
                setNotification({
                    type: "error",
                    message: "Could not add image, try again",
                });
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

        navigate("/main", {
            state: {
                notification: {
                    type: "notification",
                    message: "New plant added!",
                },
            },
        });
    };

    const handleImageRemove = () => {
        setPlant({ ...plant, imageName: "" });
    };

    return (
        <>
            {notification && <ShowNotification notification={notification} />}
            <PlantForm
                handleSubmit={(event) => void handleSubmit(event)}
                handleChange={handleChange}
                handleImageChange={(event) => void handleImageChange(event)}
                handleImageRemove={handleImageRemove}
                plant={plant}
                uploading={uploading}
                addNewGrowingMedium={addNewGrowingMedium}
                hideGrowingMediumForm={hideGrowingMediumForm}
            />
        </>
    );
};

export default AddPlant;
