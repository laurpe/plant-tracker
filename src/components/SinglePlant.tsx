import Popup from "./style/Generics/Popup";

import axios from "axios";

import { Plant, GrowingMedium } from "../types";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";

import PlantForm from "./PlantForm";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "./style/Generics/IconButton";

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
    growingMediums: GrowingMedium[];
}

const SinglePlant = ({ plants, setPlants, growingMediums }: Props) => {
    const [plant, setPlant] = useState<Plant>({
        name: "",
        growingMedium: "",
        lastWatered: "",
        wateringCycle: 0,
        imageName: "",
        id: "",
    });
    const [uploading, setUploading] = useState<boolean>(false);

    const id = useParams().id as string;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlant = async () => {
            const result = await getData<Plant>(`plants/${id}`);
            setPlant(result);
        };

        fetchPlant().catch(() => {
            throw new Error("Fetch plant unsuccessful");
        });
    }, [id]);

    const updatePlant = async (plant: Plant): Promise<void> => {
        try {
            console.log(plant);
            await axios.put<Plant>(`${baseUrl}/plants/${id}`, plant);
            const plantsCopy = [...plants];
            const i = plantsCopy.findIndex((plant) => plant.id === id);
            plantsCopy[i] = plant;

            setPlants(plantsCopy);
        } catch (error) {
            throw new Error("Could not update plant");
        }
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await axios.delete<Plant>(`${baseUrl}/plants/${id}`);
            const plantsWithoutDeleted = plants.filter(
                (plant) => plant.id !== id
            );
            setPlants(plantsWithoutDeleted);
        } catch (error) {
            throw new Error("Could not delete plant");
        }
        navigate("/");
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
        const plantCopy = {
            ...plant,
        };
        await updatePlant(plantCopy);
        setPlant({
            name: "",
            growingMedium: "",
            lastWatered: "",
            wateringCycle: 0,
            imageName: "",
            id: "",
        });
        navigate("/");
    };

    const handleImageRemove = () => {
        setPlant({ ...plant, imageName: "" });
    };

    return (
        <Popup>
            <StyledColumn>
                <Row justifyContent="space-between">
                    <Title>Plant details</Title>
                    <Row>
                        <IconButton
                            type="button"
                            onClick={() => {
                                void handleDelete(id);
                            }}
                        >
                            <DeleteIcon sx={{ fontSize: 26 }} />
                        </IconButton>
                        <Link to={"/"}>
                            <IconButton type="button">
                                <CloseIcon sx={{ fontSize: 26 }} />
                            </IconButton>
                        </Link>
                    </Row>
                </Row>
                <PlantForm
                    handleSubmit={(event) => void handleSubmit(event)}
                    handleChange={handleChange}
                    growingMediums={growingMediums}
                    handleImageChange={(event) => void handleImageChange(event)}
                    handleImageRemove={handleImageRemove}
                    plant={plant}
                    uploading={uploading}
                />
            </StyledColumn>
        </Popup>
    );
};

export default SinglePlant;
