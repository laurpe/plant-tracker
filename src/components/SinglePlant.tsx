import Popup from "./style/Generics/Popup";

import axios from "axios";

import { Plant } from "../types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";

import PlantForm from "./PlantForm";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imgBaseUrl = process.env.REACT_APP_IMAGE_UPLOAD_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const StyledColumn = styled(Column)`
    height: 100%;
    padding-bottom: 40px;
`;

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const SinglePlant = ({ plants, setPlants }: Props) => {
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

    const [image, setImage] = useState<string>("");
    const [growingMedium, setGrowingMedium] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

    const updatePlant = async (plant: Plant): Promise<void> => {
        try {
            await axios.put<Plant>(`${baseUrl}/plants/${id}`, plant);
            const plantsCopy = [...plants];
            const i = plantsCopy.findIndex((plant) => plant.id === id);
            plantsCopy[i] = plant;

            setPlants(plantsCopy);
        } catch (error) {
            throw new Error("Could not update plant");
        }
    };

    // form functions

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPlant({ ...plant, [event.target.name]: event.target.value });
    };

    const handleGrowingMediumChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        setGrowingMedium(event.target.value);
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const uploadImage = async () => {
            if (event.target.files) {
                const image = event.target.files[0];

                const config = { headers: { "Content-Type": "image/jpeg" } };

                try {
                    const response = await axios.post<{
                        [key: string]: string;
                    }>(`${imgBaseUrl}/upload`, image, config);
                    setImage(response.data.imgName);
                } catch (error) {
                    throw new Error("Could not upload image");
                }
            }
        };
        setUploading(true);
        void uploadImage();
        setUploading(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const plantCopy = {
            ...plant,
            growingMedium: growingMedium,
            imageName: image,
        };
        void updatePlant(plantCopy);
        setPlant({
            name: "",
            growingMedium: "",
            lastWatered: "2022-07-07",
            wateringCycle: 0,
            imageName: "",
        });
        console.log("plant: ", plantCopy);
        setToggleAddPlantForm(false);
    };

    return (
        <Popup>
            <StyledColumn>
                <Row justifyContent="space-between">
                    <Title>{plant.name}</Title>
                    <Row>
                        <EditIcon sx={{ fontSize: 30 }} />
                        <DeleteIcon sx={{ fontSize: 30 }} />
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </Row>
                </Row>
                <PlantForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleGrowingMediumChange={handleGrowingMediumChange}
                    growingMediums={growingMediums}
                    handleImageChange={handleImageChange}
                    plant={plant}
                    uploading={uploading}
                />
            </StyledColumn>
        </Popup>
    );
};

export default SinglePlant;
