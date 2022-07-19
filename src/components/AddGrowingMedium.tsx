import { useNavigate } from "react-router-dom";

import Popup from "./style/Generics/Popup";
import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";

import GrowingMediumForm from "./GrowingMediumForm";

import CloseIcon from "@mui/icons-material/Close";

const AddGrowingMedium = () => {
    const navigate = useNavigate();

    return (
        <Popup>
            <Column
                justifyContent="space-between"
                height="100%"
                padding="0 0 40px 0"
            >
                <Row justifyContent="space-between">
                    <Title>Add growing medium</Title>
                    <IconButton type="button" onClick={() => navigate(-1)}>
                        <CloseIcon sx={{ fontSize: 26 }} />
                    </IconButton>
                </Row>
                <GrowingMediumForm />
            </Column>
        </Popup>
    );
};

export default AddGrowingMedium;
