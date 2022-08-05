import { Plant, TempPlant } from "../types";

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
import { useGrowingMediums } from "../hooks/useGrowingMediums";

const imgBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL as string;

interface Props {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
    handleImageRemove: () => void;
    plant: Plant | TempPlant;
    uploading: boolean;
}

const StyledDiv = styled.div`
  position: relative;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
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
    position: absolute;
    top: 1rem;
`;

const StyledColumn = styled(Column)`
    padding-top: 1rem;
    border-radius: 20px;
    margin-top: -40px;
    background-color: white;
    z-index: 100;
`

const PicDiv = styled.div`
    background-image: url(${(props: { url?: string }) => props.url});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    height: 500px;
    background-color: #ededed;
`

const PlantForm = ({
    handleSubmit,
    handleChange,
    handleImageChange,
    handleImageRemove,
    plant,
    uploading,
}: Props) => {
    const { growingMediums } = useGrowingMediums();

    const maxDate = new Date().toISOString().substring(0, 10);

    return (
        <Form onSubmit={handleSubmit}>
            <Column justifyContent="space-between" height="100%">
                <StyledDiv>
                    {!plant.imageName &&
                        <>
                            <PicDiv />
                            <StyledInput
                                type="file"
                                name="file"
                                id="plant-image-input"
                                accept="image/jpeg, image/png"
                                onChange={handleImageChange}
                            />
                        </>
                    }
                    {plant.imageName && (
                        <>
                            <PicDiv url={`${imgBaseUrl}/${plant.imageName}`} />
                            <StyledIconButton
                                type="button"
                                id="img-remove-btn"
                                onClick={() => {
                                    handleImageRemove();
                                }}
                            >
                                <StyledDeleteIcon sx={{ fontSize: 26 }} />
                            </StyledIconButton>
                        </>
                    )}
                </StyledDiv>
                <StyledColumn>
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
                    <Label htmlFor="growingMedium">Growing medium</Label>
                    <Row alignItems="start">
                        <Select
                            onChange={handleChange}
                            name="growingMedium"
                            id="plant-growingMedium-select"
                            value={plant.growingMedium}
                            flex={1}
                            required
                        >
                            <option value="" disabled>
                                select...
                            </option>
                            <option>create new</option>
                            <option disabled>-----</option>
                            {growingMediums.map((growingMedium) => {
                                return (
                                    <option key={growingMedium.id} value={growingMedium.id}>
                                        {growingMedium.name}
                                    </option>
                                );
                            })}
                        </Select>
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
                </StyledColumn>
                <Button type="submit" id="submit-btn" width="100%" disabled={uploading}>
                    Save
                </Button>
            </Column>
        </Form>
    );
};

export default PlantForm;
