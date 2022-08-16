import styled from "styled-components";
import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Overlay from "./style/Generics/Overlay";
import Popup from "./style/Generics/Popup";
import Row from "./style/Generics/Row";

interface Props {
    deletePlant: (id: string) => Promise<void>;
    hideConfirmation: () => void;
    id: string;
}

const StyledPopup = styled(Popup)`
    border-radius: 20px 20px 0 0;
`;

const StyledP = styled.p`
    text-align: center;
    color: #7b9c99;
`;

const Confirmation = ({ deletePlant, hideConfirmation, id }: Props) => {
    return (
        <Overlay onClick={() => hideConfirmation()}>
            <StyledPopup>
                <Column
                    height="30vh"
                    justifyContent="space-between"
                    padding="32px"
                >
                    <StyledP>
                        Are you sure you want to delete this plant?
                    </StyledP>
                    <Row>
                        <Button
                            id="confirm-plant-delete-btn"
                            flex="1"
                            margin="0 0.8rem 0 0"
                            onClick={() => void deletePlant(id)}
                        >
                            Yes
                        </Button>
                        <Button
                            flex="1"
                            backgroundColor="#ea5c5c"
                            onClick={() => hideConfirmation()}
                        >
                            No
                        </Button>
                    </Row>
                </Column>
            </StyledPopup>
        </Overlay>
    );
};

export default Confirmation;
