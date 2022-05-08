import { useEffect, useState } from "react";
import { Plant } from "./types";
import Plants from "./components/Plants";
import AddPlantForm from "./components/AddPlantForm";
import Header from "./components/Header";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const getData = async <T,>(url: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${url}`);
    return response.json() as Promise<T>;
};

const App = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [toggleAddPlantForm, setToggleAddPlantForm] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData<Plant[]>("plants");
            setPlants(result);
        };
        fetchData().catch(() => {
            throw new Error("Fetch plants unsuccessful");
        });
    }, []);

    const handleToggleFormClick = (): void => {
        setToggleAddPlantForm(!toggleAddPlantForm);
    };

    return (
        <div className="content">
            <Header handleToggleFormClick={handleToggleFormClick} />
            {toggleAddPlantForm && (
                <AddPlantForm
                    plants={plants}
                    setPlants={setPlants}
                    handleToggleFormClick={handleToggleFormClick}
                />
            )}
            <Plants plants={plants} setPlants={setPlants} />
        </div>
    );
};

export default App;
