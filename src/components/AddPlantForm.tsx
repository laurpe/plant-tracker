import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TempPlant, Plant, GrowingMedium } from "../types";

import axios from "axios";

import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import Form from "./style/Generics/Form";
import Button from "./style/Generics/Button";
import Title from "./style/Generics/Title";
import Row from "./style/Generics/Row";
import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";
import Select from "./style/Generics/Select";
import IconButton from "./style/Generics/IconButton";
import Image from "./style/Generics/Image";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import styled from "styled-components";

const StyledColumn = styled(Column)`
    height: 100%;
    padding-bottom: 40px;
`;

const StyledDiv = styled.div`
    position: relative;
    margin-right: 16px;
`;

const StyledIconButton = styled(IconButton)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    box-shadow: none;
    color: white;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    padding: 2px;
    height: 100px;
    width: 100px;
`;

const StyledInput = styled(Input)`
    width: 122px;
    margin-right: 16px;
    height: 122px;
`;

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;
const imgUploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_API_BASE_URL as string;
const imgBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL as string;

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    growingMediums: GrowingMedium[];
}

const AddPlantForm = ({ plants, setPlants, growingMediums }: Props) => {
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

    const navigate = useNavigate();

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
                    }>(`${imgUploadUrl}/upload`, image, config);
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
        navigate("/");
    };

    const handleImageRemove = () => {
        setImage("");
    };

    const maxDate = new Date().toISOString().substring(0, 10);

    return (
        <Popup>
            <StyledColumn justifyContent="space-between">
                <Row justifyContent="space-between">
                    <Title>Add plant</Title>
                    <IconButton type="button" onClick={() => navigate("/")}>
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Column justifyContent="space-between" height="100%">
                        <Column>
                            <Row alignItems="start">
                                <Column>
                                    <Label htmlFor="file">Image</Label>
                                    {!image && (
                                        <StyledInput
                                            type="file"
                                            name="file"
                                            id="plant-image-input"
                                            accept="image/jpeg, image/png"
                                            onChange={handleImageChange}
                                        />
                                    )}
                                    {image && (
                                        <StyledDiv>
                                            <Image
                                                src={`${imgBaseUrl}/${image}`}
                                                alt="plant"
                                            />
                                            <StyledIconButton
                                                onClick={() => {
                                                    handleImageRemove();
                                                }}
                                            >
                                                <StyledDeleteIcon
                                                    sx={{ fontSize: 26 }}
                                                />
                                            </StyledIconButton>
                                        </StyledDiv>
                                    )}
                                </Column>
                                <Column flex={1}>
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
                                        <option hidden>Select...</option>
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
                                </Column>
                            </Row>
                            <Column>
                                <Label htmlFor="lastWatered">
                                    Last watered
                                </Label>
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
                            </Column>
                        </Column>
                        <Button
                            type="submit"
                            id="add-plant-btn"
                            width="100%"
                            disabled={uploading}
                        >
                            Add
                        </Button>
                    </Column>
                </Form>
                <Row justifyContent="space-between"></Row>
            </StyledColumn>
        </Popup>
    );
};

export default AddPlantForm;
