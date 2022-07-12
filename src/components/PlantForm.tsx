import { Plant, GrowingMedium } from "../types";

import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import Form from "./style/Generics/Form";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Select from "./style/Generics/Select";

interface Props {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleGrowingMediumChange: React.ChangeEventHandler<HTMLSelectElement>;
    handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
    growingMediums: GrowingMedium[];
    plant: Plant;
    uploading: boolean;
}

const PlantForm = ({
    handleSubmit,
    handleChange,
    handleGrowingMediumChange,
    growingMediums,
    handleImageChange,
    plant,
    uploading,
}: Props) => {
    const maxDate = new Date().toISOString().substring(0, 10);

    return (
        <Form onSubmit={handleSubmit}>
            <Column justifyContent="space-between" height="100%">
                <Column>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="plant-name-input"
                        onChange={handleChange}
                        defaultValue={plant.name}
                        value={plant.name}
                        minLength={2}
                        maxLength={30}
                        maximum-scale={1}
                        required
                    />
                    <Label htmlFor="growingMedium">Growing medium</Label>
                    <Select
                        onChange={handleGrowingMediumChange}
                        name="growingMedium"
                        id="plant-growingMedium-select"
                        defaultValue={plant.growingMedium.id}
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
                        defaultValue={plant.lastWatered}
                        onChange={handleChange}
                        value={plant.lastWatered}
                        max={maxDate}
                    />
                    <Label htmlFor="wateringCycle">Watering cycle</Label>
                    <Input
                        type="number"
                        name="wateringCycle"
                        id="plant-wateringCycle-input"
                        defaultValue={plant.wateringCycle}
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
    );
};

export default PlantForm;
