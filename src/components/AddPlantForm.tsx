import React, { useState } from "react";

import { TempPlant, Plant } from "../types";

import axios from "axios";

import Card from "./style/Generics/Card";
import Input from "./style/Generics/Form/Input";
import Label from "./style/Generics/Form/Label";
import Form from "./style/Generics/Form/Form";
import Button from "./style/Generics/Button";
import Subtitle from "./style/Generics/Subtitle";
import Row from "./style/Generics/Row";
import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";

import styled from "styled-components";

const StyledCard = styled(Card)`
    height: 100%;
`;

const StyledColumn = styled(Column)`
    height: 100%;
    padding-bottom: 40px;
`;

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imgBaseUrl = process.env.REACT_APP_IMAGE_UPLOAD_API_BASE_URL as string;

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
    setToggleAddPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPlantForm = ({
    plants,
    setPlants,
    handleToggleFormClick,
    setToggleAddPlantForm,
}: Props) => {
    const [plant, setPlant] = useState<TempPlant>({
        name: "",
        soil: "",
        lastWatered: "",
        wateringCycle: 0,
        imageName: "",
    });
    const [image, setImage] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPlant({ ...plant, [event.target.name]: event.target.value });
    };

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const plantCopy = { ...plant, imageName: image };
        plantCopy.lastWatered = new Date(plant.lastWatered).toISOString();
        setPlant(plantCopy);
        void addPlant(plantCopy);
        setPlant({
            name: "",
            soil: "",
            lastWatered: "",
            wateringCycle: 0,
            imageName: "",
        });
        setToggleAddPlantForm(false);
    };

    const maxDate = new Date().toISOString().substring(0, 10);

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

    return (
        <Popup>
            <StyledCard>
                <Form onSubmit={handleSubmit}>
                    <StyledColumn justifyContent="space-between">
                        <Column>
                            <Subtitle>Add plant</Subtitle>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={plant.name}
                                minLength={2}
                                maxLength={30}
                                maximum-scale={1}
                                required
                            />
                            <Label htmlFor="soil">Soil</Label>
                            <Input
                                type="text"
                                name="soil"
                                onChange={handleChange}
                                value={plant.soil}
                                maximum-scale={1}
                                required
                            />
                            <Label htmlFor="lastWatered">Last watered</Label>
                            <Input
                                type="date"
                                name="lastWatered"
                                onChange={handleChange}
                                value={plant.lastWatered}
                                max={maxDate}
                            />
                            <Label htmlFor="wateringCycle">
                                Watering cycle
                            </Label>
                            <Input
                                type="number"
                                name="wateringCycle"
                                onChange={handleChange}
                                value={plant.wateringCycle}
                                min="1"
                                maximum-scale={1}
                                required
                            />
                            <Label htmlFor="file">Image</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/jpeg, image/png"
                                onChange={handleImageChange}
                            />
                        </Column>
                        <Row justifyContent="space-between">
                            <Button
                                type="button"
                                width="120px"
                                onClick={handleToggleFormClick}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                width="120px"
                                disabled={uploading}
                            >
                                Add
                            </Button>
                        </Row>
                    </StyledColumn>
                </Form>
            </StyledCard>
        </Popup>
    );
};

export default AddPlantForm;
