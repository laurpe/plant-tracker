import { Plant } from "../types";

import Plants from "./Plants";
import Header from "./Header";

interface Props {
    plants: Plant[];
    setPlants: (plants: Plant[]) => void;
}

const Main = ({ plants, setPlants }: Props) => {
    return (
        <>
            <Header />
            <Plants plants={plants} setPlants={setPlants} />
        </>
    );
};

export default Main;
