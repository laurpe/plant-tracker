import { axiosPrivate } from "../util/axiosPrivate";

import { Plant } from "../types";
import { usePlants } from "../hooks/usePlants";
import { useUser } from "../hooks/useUser";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PlantForm from "./PlantForm";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL as string;
const imgBaseUrl = import.meta.env.VITE_APP_IMAGE_UPLOAD_API_BASE_URL as string;

const SinglePlant = () => {
    const [plant, setPlant] = useState<Plant>({
        name: "",
        growingMedium: "",
        lastWatered: "",
        wateringCycle: 0,
        imageName: "",
        id: "",
    });
    const [uploading, setUploading] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState<boolean>(false);

    const { updatePlant, removePlant } = usePlants();

    const [addNewGrowingMedium, setAddNewGrowingMedium] =
        useState<boolean>(false);

    const hideGrowingMediumForm = () => {
        setAddNewGrowingMedium(false);
    };

    const id = useParams().id as string;

    const navigate = useNavigate();

    const { user } = useUser();

    useEffect(() => {
        if (user.token === "") {
            return;
        }
        const fetchPlant = async () => {
            const response = await axiosPrivate.get<Plant>(
                `${baseUrl}/plants/${id}`,
                {
                    headers: { Authorization: `Bearer ${user.token || ""}` },
                }
            );
            setPlant(response.data);
        };

        fetchPlant().catch(() => {
            throw new Error("Fetch plant unsuccessful");
        });
    }, [id, user]);

    const update = async (plant: Plant): Promise<void> => {
        try {
            const response = await axiosPrivate.put<Plant>(
                `${baseUrl}/plants/${id}`,
                plant,
                {
                    headers: { Authorization: `Bearer ${user.token || ""}` },
                }
            );

            updatePlant(response.data);
        } catch (error) {
            throw new Error("Could not update plant");
        }
    };

    const handleDelete = () => {
        setConfirmation(true);
    };

    const deletePlant = async (id?: string): Promise<void> => {
        if (id) {
            try {
                await axiosPrivate.delete<Plant>(`${baseUrl}/plants/${id}`, {
                    headers: { Authorization: `Bearer ${user.token || ""}` },
                });

                removePlant(id);
            } catch (error) {
                throw new Error("Could not delete plant");
            }

            navigate("/main", {
                state: {
                    notification: {
                        type: "notification",
                        message: "Plant deleted!",
                    },
                },
            });
        }
    };

    const hideConfirmation = () => {
        setConfirmation(false);
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
                }>(`${imgBaseUrl}/upload`, image, config);
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

        await update(plant);

        setPlant({
            name: "",
            growingMedium: "",
            lastWatered: "",
            wateringCycle: 0,
            imageName: "",
            id: "",
        });

        navigate("/main", {
            state: {
                notification: {
                    type: "notification",
                    message: "Plant updated!",
                },
            },
        });
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
            handleDelete={handleDelete}
            deleteResource={deletePlant}
            addNewGrowingMedium={addNewGrowingMedium}
            hideGrowingMediumForm={hideGrowingMediumForm}
            hideConfirmation={hideConfirmation}
            confirmation={confirmation}
        />
    );
};

export default SinglePlant;
