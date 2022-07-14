import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GrowingMedium, TempGrowingMedium } from "../types";

import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Form from "./style/Generics/Form";
import Row from "./style/Generics/Row";
import Select from "./style/Generics/Select";
import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import IconButton from "./style/Generics/IconButton";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styled from "styled-components";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

interface Props {
    growingMediums: GrowingMedium[];
    setGrowingMediums: (growingMediums: GrowingMedium[]) => void;
}

const StyledColorsIconButton = styled(IconButton)`
    background-color: #35746d;
    color: white;
    border-radius: 5px;
    height: 2.85rem;
    width: 2.85rem;
    margin: ${(props: { margin?: string }) => props.margin || "0"};
`;

const GrowingMediumForm = ({ growingMediums, setGrowingMediums }: Props) => {
    const [growingMedium, setGrowingMedium] = useState<TempGrowingMedium>({
        name: "",
        composition: [
            { component: "", percentage: 50 },
            { component: "", percentage: 50 },
        ],
    });

    const navigate = useNavigate();

    const addGrowingMedium = async (
        growingMedium: TempGrowingMedium
    ): Promise<void> => {
        try {
            const response = await axios.post<GrowingMedium>(
                `${baseUrl}/growing-mediums`,
                growingMedium
            );
            setGrowingMediums([...growingMediums, response.data]);
        } catch (error) {
            throw new Error("Could not add growing medium");
        }
    };

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        componentIndex: number
    ): void => {
        const composition = growingMedium.composition.map(
            (component, index) => {
                if (index === componentIndex) {
                    return {
                        ...component,
                        [event.target.name]: event.target.value,
                    };
                }
                return component;
            }
        );
        setGrowingMedium({ ...growingMedium, composition: composition });
    };

    const handleAddMoreComponents = () => {
        const newGrowingMedium: TempGrowingMedium = {
            ...growingMedium,
            composition: [
                ...growingMedium.composition,
                { component: "", percentage: 0 },
            ],
        };
        setGrowingMedium(newGrowingMedium);
    };

    const handleRemoveComponents = () => {
        const growingMediumCopy = { ...growingMedium };
        growingMediumCopy.composition.pop();

        setGrowingMedium(growingMediumCopy);
    };

    const handleMixNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setGrowingMedium({
            ...growingMedium,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        await addGrowingMedium(growingMedium);

        setGrowingMedium({
            name: "",
            composition: [
                { component: "", percentage: 50 },
                { component: "", percentage: 50 },
            ],
        });

        navigate(-1);
    };

    return (
        <Form onSubmit={(event) => void handleSubmit(event)}>
            <Column justifyContent="space-between" height="100%">
                <Column>
                    <Label htmlFor="name">Mix name</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={handleMixNameChange}
                        value={growingMedium.name}
                    />
                    {growingMedium.composition.map((component, index) => {
                        return (
                            <Row key={index} alignItems="start">
                                <Column flex={1}>
                                    <Label htmlFor="component">
                                        Component #{index + 1}
                                    </Label>
                                    <Select
                                        onChange={(event) =>
                                            handleChange(event, index)
                                        }
                                        name="component"
                                        margin="0 0.8rem 0.8rem 0"
                                    >
                                        <option hidden>Select...</option>
                                        {growingMediums.map((growingMedium) => {
                                            return (
                                                <option
                                                    key={growingMedium.id}
                                                    value={growingMedium.name}
                                                >
                                                    {growingMedium.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </Column>

                                <Column>
                                    <Label htmlFor="percentage">
                                        Percentage
                                    </Label>
                                    <Input
                                        type="number"
                                        name="percentage"
                                        onChange={(event) =>
                                            handleChange(event, index)
                                        }
                                        value={
                                            growingMedium.composition[index]
                                                .percentage
                                        }
                                    />
                                </Column>
                                <Column>
                                    <Label color="white">-</Label>
                                    <StyledColorsIconButton
                                        type="button"
                                        onClick={handleRemoveComponents}
                                        margin="0 0 0 0.8rem"
                                    >
                                        <RemoveIcon sx={{ fontSize: 20 }} />
                                    </StyledColorsIconButton>
                                </Column>
                            </Row>
                        );
                    })}

                    <StyledColorsIconButton
                        type="button"
                        onClick={handleAddMoreComponents}
                        margin="0 0 0.8rem 0"
                    >
                        <AddIcon sx={{ fontSize: 20 }} />
                    </StyledColorsIconButton>
                </Column>
                <Button type="submit" width="100%">
                    Save growing medium
                </Button>
            </Column>
        </Form>
    );
};

export default GrowingMediumForm;
