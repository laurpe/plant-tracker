import axios from "axios";

import { Plant } from "../types";
import { usePlants } from "../hooks/usePlants";
import { useUser } from "../hooks/useUser";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PlantForm from "./PlantForm";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imgBaseUrl = process.env.REACT_APP_IMAGE_UPLOAD_API_BASE_URL as string;

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

    const { updatePlant, removePlant } = usePlants();

    const [addGrowingMedium, setAddGrowingMedium] = useState<boolean>(false)

    const hideGrowingMediumForm = () => {
        setAddGrowingMedium(false)
    }

    const id = useParams().id as string;

    const navigate = useNavigate();

    const { user } = useUser();

    useEffect(() => {
        if (user.token === "") {
            return;
        }
        const fetchPlant = async () => {
            const response = await axios.get<Plant>(`${baseUrl}/plants/${id}`, {
                headers: { Authorization: `Bearer ${user.token || ""}` },
            });
            setPlant(response.data);
        };

        fetchPlant().catch(() => {
            throw new Error("Fetch plant unsuccessful");
        });
    }, [id, user]);

    const update = async (plant: Plant): Promise<void> => {
        try {
            const response = await axios.put<Plant>(
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

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await axios.delete<Plant>(`${baseUrl}/plants/${id}`, {
                headers: { Authorization: `Bearer ${user.token || ""}` },
            });

            removePlant(id);
        } catch (error) {
            throw new Error("Could not delete plant");
        }
        navigate("/main");
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
            handleDelete={handleDelete}
            addGrowingMedium={addGrowingMedium}
            hideGrowingMediumForm={hideGrowingMediumForm}
        />
    );
};

export default SinglePlant;
