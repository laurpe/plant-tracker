import { Plant, GrowingMedium, TempPlant } from "../types";

import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import Form from "./style/Generics/Form";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Select from "./style/Generics/Select";
import Row from "./style/Generics/Row";
import IconButton from "./style/Generics/IconButton";
import Image from "./style/Generics/Image";

import DeleteIcon from "@mui/icons-material/Delete";

import styled from "styled-components";

const imgBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL as string;

interface Props {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    >;
    handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
    handleImageRemove: () => void;
    growingMediums: GrowingMedium[];
    plant: Plant | TempPlant;
    uploading: boolean;
}

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

const PlantForm = ({
    handleSubmit,
    handleChange,
    growingMediums,
    handleImageChange,
    handleImageRemove,
    plant,
    uploading,
}: Props) => {
    const maxDate = new Date().toISOString().substring(0, 10);

    return (
        <Form onSubmit={handleSubmit}>
            <Column justifyContent="space-between" height="100%">
                <Column>
                    <Row alignItems="start">
                        <Column>
                            <Label htmlFor="file">Image</Label>
                            {!plant.imageName && (
                                <StyledInput
                                    type="file"
                                    name="file"
                                    id="plant-image-input"
                                    accept="image/jpeg, image/png"
                                    onChange={handleImageChange}
                                />
                            )}
                            {plant.imageName && (
                                <StyledDiv>
                                    <Image
                                        src={`${imgBaseUrl}/${plant.imageName}`}
                                        alt="plant"
                                    />
                                    <StyledIconButton
                                        type="button"
                                        id="img-remove-btn"
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
                                onChange={handleChange}
                                name="growingMedium"
                                id="plant-growingMedium-select"
                                value={plant.growingMedium}
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
                    <Label htmlFor="lastWatered">Last watered</Label>
                    <Input
                        type="date"
                        name="lastWatered"
                        id="plant-lastWatered-input"
                        onChange={handleChange}
                        value={plant.lastWatered.substring(0, 10)}
                        max={maxDate}
                    />
                    <Label htmlFor="wateringCycle">Watering cycle</Label>
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
                <Button
                    type="submit"
                    id="submit-btn"
                    width="100%"
                    disabled={uploading}
                >
                    Save
                </Button>
            </Column>
        </Form>
    );
};

export default PlantForm;
