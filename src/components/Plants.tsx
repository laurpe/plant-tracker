import dayjs from "dayjs";

import { Plant } from "../types";
import PlantCard from "./PlantCard";
import { usePlants } from "../hooks/usePlants";
import { useState } from "react";

import styled from "styled-components";

const calculateNextWatering = (plant: Plant): dayjs.Dayjs => {
    const nextWatering = dayjs(plant.lastWatered).add(
        plant.wateringCycle,
        "day"
    );

    return nextWatering;
};

const StyledInput = styled.input`
    border: none;
    border-radius: 10px;
    background-color: white;
    min-height: 1.5rem;
    padding: 1rem;
    font-family: inherit;
    font-size: 1.2rem;
    color: #225c55;
    width: 100%;
    margin: 1rem 0 1rem 0;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0.5px;

    &::placeholder {
        color: #7b9c99;
    }
`;

const Plants = () => {
    const { plants, updatePlant } = usePlants();
    const [search, setSearch] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <StyledInput
                type="text"
                placeholder="search plant"
                value={search}
                onChange={handleChange}
            />
            {search &&
                plants
                    .filter((plant) =>
                        plant.name
                            .toLowerCase()
                            .includes(search.toLowerCase().trim())
                    )
                    .map((plant) => {
                        const nextWatering = calculateNextWatering(plant);
                        return (
                            <PlantCard
                                plant={plant}
                                key={plant.id}
                                nextWatering={nextWatering}
                                updatePlant={updatePlant}
                            />
                        );
                    })}

            {!search &&
                plants
                    .sort((a, b) => {
                        const aNextWatering = calculateNextWatering(a);
                        const bNextWatering = calculateNextWatering(b);

                        return aNextWatering.isBefore(bNextWatering) ? -1 : 1;
                    })
                    .map((plant) => {
                        const nextWatering = calculateNextWatering(plant);
                        return (
                            <PlantCard
                                plant={plant}
                                key={plant.id}
                                nextWatering={nextWatering}
                                updatePlant={updatePlant}
                            />
                        );
                    })}
        </>
    );
};

export default Plants;
