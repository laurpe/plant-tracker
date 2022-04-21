import { Plant } from "../types";

const PlantCard = ({ plant }: { plant: Plant }) => {
    return (
        <>
            <div>
                <h2>{plant.name}</h2>
                <button type="button">water</button>
            </div>
            <div>water next tuesday</div>
        </>
    );
};

export default PlantCard;
