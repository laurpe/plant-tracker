import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Popup from "./style/Generics/Popup";
import Row from "./style/Generics/Row";

interface Props {
    deletePlant: (id: string) => Promise<void>;
    hideConfirmation: () => void;
    id: string;
}

const Confirmation = ({ deletePlant, hideConfirmation, id }: Props) => {
    return (
        <Popup>
            <Column>
                <p>Are you sure you want to delete this plant?</p>
                <Row>
                    <Button onClick={() => void deletePlant(id)}>Yes</Button>
                    <Button onClick={() => hideConfirmation()}>No</Button>
                </Row>
            </Column>
        </Popup>
    );
};

export default Confirmation;
