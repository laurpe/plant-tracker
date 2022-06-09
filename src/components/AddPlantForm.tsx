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

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    handleToggleFormClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AddPlantForm = ({ plants, setPlants, handleToggleFormClick }: Props) => {
    const [plant, setPlant] = useState<TempPlant>({
        name: "",
        soil: "",
        lastWatered: "",
        wateringCycle: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPlant({ ...plant, [event.target.name]: event.target.value });
    };

    const addPlant = async (plant: TempPlant): Promise<void> => {
        try {
            const response = await axios.post<Plant>(`${baseUrl}plants`, plant);
            setPlants([...plants, response.data]);
        } catch (error) {
            throw new Error("Could not add plant");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const plantCopy = plant;
        plantCopy.lastWatered = new Date(plant.lastWatered).toISOString();
        setPlant(plantCopy);
        void addPlant(plantCopy);
        setPlant({
            name: "",
            soil: "",
            lastWatered: "",
            wateringCycle: 0,
        });
    };

    const maxDate = new Date().toISOString().substring(0, 10);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const data = new FormData();

        const uploadImage = async () => {
            if (event.target.files) {
                data.append("file", event.target.files[0]);

                try {
                    await axios.post(`${baseUrl}upload`, data);
                } catch (error) {
                    throw new Error("Could not upload image");
                }
            }
        };

        void uploadImage();
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <Subtitle>Add plant</Subtitle>
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={plant.name}
                    minLength={2}
                    maxLength={30}
                    required
                />
                <Label htmlFor="soil">Soil</Label>
                <Input
                    type="text"
                    name="soil"
                    onChange={handleChange}
                    value={plant.soil}
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
                <Label htmlFor="wateringCycle">Watering cycle</Label>
                <Input
                    type="number"
                    name="wateringCycle"
                    onChange={handleChange}
                    value={plant.wateringCycle}
                    min="1"
                    required
                />
                <Label htmlFor="file">Image</Label>
                <Input type="file" name="file" onChange={handleImageChange} />
                <Row justifyContent="space-between">
                    <Button type="submit" width="120px">
                        Add
                    </Button>
                    <Button
                        type="button"
                        width="120px"
                        onClick={handleToggleFormClick}
                    >
                        Close
                    </Button>
                </Row>
            </Form>
        </Card>
    );
};

//TODO: let user add only one image

export default AddPlantForm;
