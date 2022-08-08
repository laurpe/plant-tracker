import { useNavigate } from "react-router-dom";

import { Plant, TempPlant } from "../types";

import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import Form from "./style/Generics/Form";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Select from "./style/Generics/Select";
import Row from "./style/Generics/Row";
import IconButton from "./style/Generics/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import HideImageIcon from "@mui/icons-material/HideImage";
import ImageIcon from '@mui/icons-material/Image';

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

const DivNoImage = styled.div`
position: relative;
  display: flex;
    justify-content: center;
    align-items: center;
`

const StyledIconButton = styled(IconButton)`
  top: 16px;
  left: 16px;
  background-color: transparent;
  color: white;
`;

const StyledLabel = styled(Label)`
    height: 3rem;
    width: 3rem;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CloseButton = styled(IconButton)`
  top: 8px;
  right: 8px;
  background-color: transparent;
  color: white;
`;

const StyledRow = styled(Row)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-image: linear-gradient(to bottom, #25252591, #00000000);
`

const StyledInput = styled(Input)`
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
`;

const StyledColumn = styled(Column)`
    padding: 16px 0 40px 0;
    border-radius: 20px 20px 0 0;
    margin-top: -40px;
    background-color: white;
    z-index: 9;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 1px;
`

const PicDiv = styled.div`
    background-image: url(${(props: { url?: string }) => props.url});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 45vh;
    background-color: rgb(235, 243, 241);
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

    const navigate = useNavigate();

    return (
        <Form onSubmit={handleSubmit}>
            <Column>

                {!plant.imageName &&
                    <DivNoImage>
                        <PicDiv />
                        <StyledRow justifyContent="flex-end" alignItems="start">
                            <CloseButton type="button"
                                id="close-form-btn"
                                onClick={() => {
                                    navigate("/main");
                                }}><CloseIcon sx={{ fontSize: 28 }} />
                            </CloseButton>
                        </StyledRow>
                        <StyledLabel htmlFor="plant-image-input">
                            <ImageIcon sx={{ fontSize: 42 }} />
                        </StyledLabel>
                        <StyledInput
                            type="file"
                            name="file"
                            id="plant-image-input"
                            accept="image/jpeg, image/png"
                            onChange={handleImageChange}
                        />
                    </DivNoImage>
                }
                {plant.imageName && (
                    <StyledDiv>
                        <PicDiv url={`${imgBaseUrl}/${plant.imageName}`} />
                        <StyledRow justifyContent="space-between" alignItems="start">
                            <StyledIconButton
                                type="button"
                                id="img-remove-btn"
                                onClick={() => {
                                    handleImageRemove();
                                }}
                            >
                                <HideImageIcon sx={{ fontSize: 28 }} />
                            </StyledIconButton>
                            <CloseButton type="button"
                                id="close-form-btn"
                                onClick={() => {
                                    navigate("/main");
                                }}><CloseIcon sx={{ fontSize: 28 }} />
                            </CloseButton>
                        </StyledRow>
                    </StyledDiv>
                )}


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
                    <Button type="submit" id="submit-btn" width="calc(100vw - 1.4rem)" disabled={uploading}>
                        Save
                    </Button>
                </StyledColumn>
            </Column>
        </Form>
    );
};

export default PlantForm;
