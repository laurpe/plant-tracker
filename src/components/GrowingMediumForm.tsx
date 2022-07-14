import React, { useState } from "react";

import { GrowingMedium, TempGrowingMedium } from "../types";

import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Form from "./style/Generics/Form";
import Row from "./style/Generics/Row";
import Select from "./style/Generics/Select";
import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import Popup from "./style/Generics/Popup";
import IconButton from "./style/Generics/IconButton";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styled from "styled-components";

interface Props {
    growingMediums: GrowingMedium[];
}

const StyledColorsIconButton = styled(IconButton)`
    background-color: #35746d;
    color: white;
    border-radius: 5px;
    height: 2.85rem;
    width: 2.85rem;
    margin: ${(props: { margin?: string }) => props.margin || "0"};
`;

const GrowingMediumForm = ({ growingMediums }: Props) => {
    const [growingMedium, setGrowingMedium] = useState<TempGrowingMedium>({
        name: "",
        composition: [
            { component: "", percentage: 50 },
            { component: "", percentage: 50 },
        ],
    });

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
        componentIndex: number
    ): void => {
        growingMedium.composition.map((component, index) => {
            if (index === componentIndex) {
                return {
                    ...component,
                    [event.target.name]: event.target.value,
                };
            }
            return component;
        });
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.log(growingMedium);
    };

    console.log(growingMedium);

    return (
        <Popup>
            <Form onSubmit={handleSubmit}>
                <Column justifyContent="space-between" height="100%">
                    <Column>
                        <Label htmlFor="mixName">Mix name</Label>
                        <Input
                            type="text"
                            name="mixName"
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
                                            {growingMediums.map(
                                                (growingMedium) => {
                                                    return (
                                                        <option
                                                            key={
                                                                growingMedium.id
                                                            }
                                                            value={
                                                                growingMedium.name
                                                            }
                                                        >
                                                            {growingMedium.name}
                                                        </option>
                                                    );
                                                }
                                            )}
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
                                    {growingMedium.composition.length !== 1 && (
                                        <Column>
                                            <Label color="white">-</Label>
                                            <StyledColorsIconButton
                                                type="button"
                                                onClick={handleRemoveComponents}
                                                margin="0 0 0 0.8rem"
                                            >
                                                <RemoveIcon
                                                    sx={{ fontSize: 20 }}
                                                />
                                            </StyledColorsIconButton>
                                        </Column>
                                    )}
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
        </Popup>
    );
};

export default GrowingMediumForm;
