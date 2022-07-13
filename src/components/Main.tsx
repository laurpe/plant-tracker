import { Plant, GrowingMedium } from "../types";

import Plants from "./Plants";
import AddPlantForm from "./AddPlantForm";
import Header from "./Header";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
    growingMediums: GrowingMedium[];
    handleToggleFormClick: () => void;
    toggleAddPlantForm: boolean;
    setToggleAddPlantForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({
    plants,
    setPlants,
    growingMediums,
    handleToggleFormClick,
    toggleAddPlantForm,
    setToggleAddPlantForm,
}: Props) => {
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
