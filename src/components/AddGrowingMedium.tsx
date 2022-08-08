import { useNavigate } from "react-router-dom";

import Column from "./style/Generics/Column";
import Row from "./style/Generics/Row";
import Title from "./style/Generics/Title";
import IconButton from "./style/Generics/IconButton";

import GrowingMediumForm from "./GrowingMediumForm";

import CloseIcon from "@mui/icons-material/Close";


const AddGrowingMedium = () => {
    const navigate = useNavigate();

    return (
        <Column backgroundColor="white" height="100%">
            <Row justifyContent="space-between" padding="0 0 0 16px">
                <Title>Add growing medium</Title>
                <IconButton type="button" backgroundColor="transparent" onClick={() => navigate(-1)}>
                    <CloseIcon sx={{ fontSize: 26 }} />
                </IconButton>
            </Row>
            <GrowingMediumForm />
        </Column>
    );
};

export default AddGrowingMedium;
