import { useEffect, useState } from "react";

import { Plant, GrowingMedium } from "../types";

import Plants from "./Plants";
import AddPlantForm from "./AddPlantForm";
import Header from "./Header";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response.json() as Promise<T>;
};

const Main = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [growingMediums, setGrowingMediums] = useState<GrowingMedium[]>([]);
    const [toggleAddPlantForm, setToggleAddPlantForm] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchPlants = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };

        fetchPlants().catch(() => {
            throw new Error("Fetch plants unsuccessful");
        });

        const fetchGrowingMediums = async () => {
            const result = await getData<GrowingMedium[]>("growing-mediums");
            setGrowingMediums(result);
        };

        fetchGrowingMediums().catch(() => {
            throw new Error("Fetch growing mediums unsuccessful");
        });
    }, []);

    const handleToggleFormClick = (): void => {
        setToggleAddPlantForm(!toggleAddPlantForm);
    };

    useEffect(() => {
        if (toggleAddPlantForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [toggleAddPlantForm]);

    return (
        <>
            <Header handleToggleFormClick={handleToggleFormClick} />
            {toggleAddPlantForm && (
                <AddPlantForm
                    plants={plants}
                    setPlants={setPlants}
                    growingMediums={growingMediums}
                    handleToggleFormClick={handleToggleFormClick}
                    setToggleAddPlantForm={setToggleAddPlantForm}
                />
            )}
            <Plants plants={plants} setPlants={setPlants} />
        </>
    );
};

export default Main;
