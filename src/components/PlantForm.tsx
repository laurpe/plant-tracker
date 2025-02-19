import { useNavigate, useParams } from "react-router-dom";

import { Plant, TempPlant } from "../types";

import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import Form from "./style/Generics/Form";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Select from "./style/Generics/Select";
import Row from "./style/Generics/Row";
import IconButton from "./style/Generics/IconButton";

import GrowingMediumForm from "./GrowingMediumForm";

import CloseIcon from "@mui/icons-material/Close";
import HideImageIcon from "@mui/icons-material/HideImage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

import styled from "styled-components";
import { useGrowingMediums } from "../hooks/useGrowingMediums";
import Overlay from "./style/Generics/Overlay";
import Popup from "./style/Generics/Popup";
import Confirmation from "./Confirmation";

const imgBaseUrl = import.meta.env.VITE_APP_IMAGE_BASE_URL as string;

interface Props {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    >;
    handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
    handleImageRemove: () => void;
    plant: Plant | TempPlant;
    uploading: boolean;
    handleDelete?: () => void;
    deleteResource?: (id?: string) => Promise<void>;
    addNewGrowingMedium: boolean;
    hideGrowingMediumForm: () => void;
    hideConfirmation?: () => void;
    confirmation?: boolean;
}

const StyledDiv = styled.div`
    position: relative;
`;

const DivNoImage = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(235, 243, 241);
`;

const StyledIconButton = styled(IconButton)`
    top: 16px;
    left: 16px;
    background-color: transparent;
    color: white;
`;

const DeleteButton = styled(IconButton)`
    color: white;
    background-color: #ff6c6c;
    border-radius: 5px;
    height: 3.5rem;
`;

const StyledLabel = styled(Label)`
    height: 30vh;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const CloseButton = styled(IconButton)`
    background-color: transparent;
    color: ${(props: { color?: string }) => props.color || "#35746d"};
`;

const StyledRow = styled(Row)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
`;

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
`;

const PicDiv = styled.div`
    background-image: url(${(props: { url?: string }) => props.url});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 45vh;
    background-color: rgb(235, 243, 241);
`;
const PlantForm = ({
    handleSubmit,
    handleChange,
    handleImageChange,
    handleImageRemove,
    plant,
    uploading,
    handleDelete,
    deleteResource,
    addNewGrowingMedium,
    hideGrowingMediumForm,
    confirmation,
    hideConfirmation,
}: Props) => {
    const { growingMediums, addGrowingMedium } = useGrowingMediums();

    const maxDate = new Date().toISOString().substring(0, 10);

    const navigate = useNavigate();

    const id = useParams().id;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Column>
                    {!plant.imageName && (
                        <DivNoImage>
                            <PicDiv />
                            <StyledRow
                                justifyContent="flex-end"
                                alignItems="start"
                            >
                                <CloseButton
                                    type="button"
                                    id="close-form-btn"
                                    color="#7b9c99"
                                    onClick={() => {
                                        navigate("/main");
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 36 }} />
                                </CloseButton>
                            </StyledRow>
                            <StyledLabel htmlFor="plant-image-input">
                                <AddPhotoAlternateIcon sx={{ fontSize: 42 }} />
                            </StyledLabel>
                            <StyledInput
                                type="file"
                                name="file"
                                id="plant-image-input"
                                accept="image/jpeg, image/png"
                                onChange={handleImageChange}
                            />
                        </DivNoImage>
                    )}
                    {plant.imageName && (
                        <StyledDiv>
                            <PicDiv url={`${imgBaseUrl}/${plant.imageName}`} />
                            <StyledRow
                                justifyContent="space-between"
                                alignItems="start"
                                background="linear-gradient(to bottom, #25252591, #00000000)"
                            >
                                <StyledIconButton
                                    type="button"
                                    id="img-remove-btn"
                                    onClick={() => {
                                        handleImageRemove();
                                    }}
                                >
                                    <HideImageIcon sx={{ fontSize: 36 }} />
                                </StyledIconButton>
                                <CloseButton
                                    type="button"
                                    id="close-form-btn"
                                    onClick={() => {
                                        navigate("/main");
                                    }}
                                    color="white"
                                >
                                    <CloseIcon sx={{ fontSize: 36 }} />
                                </CloseButton>
                            </StyledRow>
                        </StyledDiv>
                    )}
                    <StyledColumn>
                        <Label htmlFor="name" padding="0 0 0 16px">
                            Name
                        </Label>
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
                        <Label htmlFor="growingMedium" padding="0 0 0 16px">
                            Growing medium
                        </Label>
                        <Row alignItems="start">
                            <Select
                                onChange={handleChange}
                                name="growingMedium"
                                id="plant-growingMedium-select"
                                value={plant.growingMedium}
                                flex="1"
                                required
                            >
                                <option value="" disabled>
                                    select...
                                </option>
                                <option>create new</option>
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
                        </Row>
                        <Label htmlFor="lastWatered" padding="0 0 0 16px">
                            Last watered
                        </Label>
                        <Input
                            type="date"
                            name="lastWatered"
                            id="plant-lastWatered-input"
                            onChange={handleChange}
                            value={plant.lastWatered.substring(0, 10)}
                            max={maxDate}
                        />
                        <Label htmlFor="wateringCycle" padding="0 0 0 16px">
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
                        <Row padding="0 0.8rem 0 0.8rem">
                            {id && (
                                <DeleteButton
                                    type="button"
                                    id="delete-plant-btn"
                                    onClick={() =>
                                        handleDelete !== undefined &&
                                        handleDelete()
                                    }
                                    margin="0 8px 0 0"
                                >
                                    <DeleteIcon sx={{ fontSize: 28 }} />
                                </DeleteButton>
                            )}
                            <Button
                                type="submit"
                                id="submit-btn"
                                flex="1"
                                disabled={uploading}
                            >
                                Save
                            </Button>
                        </Row>
                    </StyledColumn>
                </Column>
            </Form>
            {addNewGrowingMedium && (
                <>
                    <Overlay onClick={() => hideGrowingMediumForm()}></Overlay>
                    <Popup>
                        <GrowingMediumForm
                            hideGrowingMediumForm={hideGrowingMediumForm}
                            growingMediums={growingMediums}
                            addGrowingMedium={addGrowingMedium}
                        />
                    </Popup>
                </>
            )}
            {confirmation && deleteResource && hideConfirmation && id && (
                <Confirmation
                    text="Are you sure you want to delete this plant?"
                    deleteResource={deleteResource}
                    hideConfirmation={hideConfirmation}
                    id={id}
                />
            )}
        </>
    );
};

export default PlantForm;
