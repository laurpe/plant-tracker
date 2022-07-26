import Popup from "./style/Generics/Popup";

import axios from "axios";

import { Plant } from "../types";
import { usePlants } from "../hooks/usePlants";
import { useUser } from "../hooks/useUser";

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

const StyledColumn = styled(Column)`
    height: 100%;
    padding-bottom: 40px;
`;

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

    const id = useParams().id as string;

    const navigate = useNavigate();

    const { getToken } = useUser();
    const token = getToken();

    useEffect(() => {
        const fetchPlant = async () => {
            const response = await axios.get<Plant>(`${baseUrl}/plants/${id}`, {
                headers: { Authorization: `Bearer ${token || ""}` },
            });
            setPlant(response.data);
        };

        fetchPlant().catch(() => {
            throw new Error("Fetch plant unsuccessful");
        });
    }, [id, token]);

    const update = async (plant: Plant): Promise<void> => {
        try {
            const response = await axios.put<Plant>(
                `${baseUrl}/plants/${id}`,
                plant
            );

            updatePlant(response.data);
        } catch (error) {
            throw new Error("Could not update plant");
        }
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await axios.delete<Plant>(`${baseUrl}/plants/${id}`);

            removePlant(id);
        } catch (error) {
            throw new Error("Could not delete plant");
        }
        navigate("/");
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
                            id="delete-plant-btn"
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
