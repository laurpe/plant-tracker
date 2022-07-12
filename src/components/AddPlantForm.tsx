import React, { useState } from "react";

import { TempPlant, Plant, GrowingMedium } from "../types";

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
import Select from "./style/Generics/Form/Select";
import IconButton from "./style/Generics/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";

const StyledCard = styled(Card)`
    height: 100%;
    padding: 16px;
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
    growingMediums: GrowingMedium[];
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
    setToggleAddPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPlantForm = ({
    plants,
    setPlants,
    growingMediums,
    handleToggleFormClick,
    setToggleAddPlantForm,
}: Props) => {
    // states

    const [plant, setPlant] = useState<TempPlant>({
        name: "",
        growingMedium: "",
        lastWatered: new Date().toISOString().substring(0, 10),
        wateringCycle: 0,
        imageName: "",
    });
    const [image, setImage] = useState<string>("");
    const [growingMedium, setGrowingMedium] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

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
        plantCopy.lastWatered = new Date(plant.lastWatered).toISOString();
        setPlant(plantCopy);
        void addPlant(plantCopy);
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

    const maxDate = new Date().toISOString().substring(0, 10);

    return (
        <Popup>
            <StyledCard>
                <StyledColumn justifyContent="space-between">
                    <Row justifyContent="space-between">
                        <Subtitle>Add plant</Subtitle>
                        <IconButton
                            type="button"
                            onClick={handleToggleFormClick}
                        >
                            <CloseIcon sx={{ fontSize: 26 }} />
                        </IconButton>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Column>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="plant-name-input"
                                onChange={handleChange}
                                value={plant.name}
                                minLength={2}
                                maxLength={30}
                                maximum-scale={1}
                                required
                            />
                            <Label htmlFor="growingMedium">
                                Growing medium
                            </Label>
                            <Select
                                onChange={handleGrowingMediumChange}
                                name="growingMedium"
                                id="plant-growingMedium-select"
                            >
                                {growingMediums.map((growingMedium) => {
                                    return (
                                        <option
                                            key={growingMedium.id}
                                            value={growingMedium.id}
                                        >
                                            {growingMedium.name}
                                        </option>
                                    );
                                })}
                            </Select>
                            <Label htmlFor="lastWatered">Last watered</Label>
                            <Input
                                type="date"
                                name="lastWatered"
                                id="plant-lastWatered-input"
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
                                id="plant-wateringCycle-input"
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
                                id="plant-image-input"
                                accept="image/jpeg, image/png"
                                onChange={handleImageChange}
                            />
                        </Column>
                    </Form>
                    <Row justifyContent="space-between">
                        <Button
                            type="submit"
                            id="add-plant-btn"
                            width="100%"
                            disabled={uploading}
                        >
                            Add
                        </Button>
                    </Row>
                </StyledColumn>
            </StyledCard>
        </Popup>
    );
};

export default AddPlantForm;
