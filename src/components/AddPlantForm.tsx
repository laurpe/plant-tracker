import React, { useState } from "react";
import { TempPlant, Plant } from "../types";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const AddPlantForm = ({ plants, setPlants }: Props) => {
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

    return (
        <div className="add-plant">
            <h2>Add plant</h2>
            <form onSubmit={handleSubmit}>
                <div className="label">
                    <label htmlFor="name">Name</label>
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={plant.name}
                        minLength={2}
                        maxLength={30}
                        required
                    />
                </div>
                <div className="label">
                    <label htmlFor="soil">Soil</label>
                </div>
                <div>
                    <input
                        type="text"
                        name="soil"
                        onChange={handleChange}
                        value={plant.soil}
                        required
                    />
                </div>
                <div className="label">
                    <label htmlFor="lastWatered">Last watered</label>
                </div>
                <div>
                    <input
                        type="date"
                        name="lastWatered"
                        onChange={handleChange}
                        value={plant.lastWatered}
                        max={maxDate}
                    />
                </div>
                <div className="label">
                    <label htmlFor="wateringCycle">Watering cycle</label>
                </div>
                <div>
                    <input
                        type="number"
                        name="wateringCycle"
                        onChange={handleChange}
                        value={plant.wateringCycle}
                        min="1"
                        required
                    />
                </div>
                <div className="form-btns">
                    <button className="form-btn" type="submit">
                        Add
                    </button>
                    <button className="form-btn" type="button">
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPlantForm;
