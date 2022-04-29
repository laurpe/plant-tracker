import useFetchPlants from "./hooks/useFetchPlants";
import Plants from "./components/Plants";

const App = () => {
    const plants = useFetchPlants();

    return <Plants plants={plants} />;
};

export default App;
