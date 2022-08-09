import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GrowingMedium, TempGrowingMedium } from "../types";

import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Form from "./style/Generics/Form";
import Row from "./style/Generics/Row";
import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";
import IconButton from "./style/Generics/IconButton";
import Notification from "./style/Generics/Notification";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styled from "styled-components";
import { useGrowingMediums } from "../hooks/useGrowingMediums";
import { useUser } from "../hooks/useUser";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const StyledColorsIconButton = styled(IconButton)`
    color: #225c55;
    border-radius: 50%;
    height: 3.2rem;
    width: 2.85rem;
`;

const StyledInput = styled.input`
    border: none;
    font-family: inherit;
    color: inherit;
    padding: 1rem;
    font-size: 1.2rem;
    color: #225c55;
    padding: 0.9rem;
    width: 100%;
    appearance: none;
    min-height: 1.5rem;
`

const StyledSelect = styled.select`
    border: none;
    font-family: inherit;
    font-size: 1.2rem;
    color: #225c55;
    padding: 0.8rem;
    height: 3.5rem;
`

const StyledRow = styled(Row)`
    border-bottom: 1px solid #b9ccca;
`

const GrowingMediumForm = () => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [growingMedium, setGrowingMedium] = useState<TempGrowingMedium>({
        name: "",
        composition: [{ component: "", percentage: 100 }],
    });
    const [notification, setNotification] = useState<string>("");

    const { growingMediums, addGrowingMedium } = useGrowingMediums();

    const navigate = useNavigate();

    const { user } = useUser();

    const percentageIsOver100 = (): boolean => {
        const total = growingMedium.composition.reduce((prev, current) => {
            return prev + +current.percentage;
        }, 0);

        if (total > 100) {
            setNotification("Components can't add up to more than 100%");
            return true;
        } else {
            setNotification("");
            return false;
        }
    };

    const nameExists = (): boolean => {
        const result = growingMediums.filter((item) => {
            return (
                item.name.toLowerCase().trim() ===
                growingMedium.name.toLowerCase().trim()
            );
        });
        if (result.length !== 0) {
            setNotification("Name already exists");
            return true;
        } else {
            setNotification("");
            return false;
        }
    };

    const saveGrowingMedium = async (
        growingMedium: TempGrowingMedium
    ): Promise<void> => {
        try {
            const response = await axios.post<GrowingMedium>(
                `${baseUrl}/growing-mediums`,
                growingMedium,
                {
                    headers: { Authorization: `Bearer ${user.token || ""}` },
                }
            );
            addGrowingMedium(response.data);
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
        setButtonDisabled(false);

        const newGrowingMedium: TempGrowingMedium = {
            ...growingMedium,
            composition: [
                ...growingMedium.composition,
                { component: "", percentage: 0 },
            ],
        };
        setGrowingMedium(newGrowingMedium);
    };

    const handleRemoveComponents = (indexof: number) => {
        const growingMediumCopy = { ...growingMedium };
        const filtered = growingMediumCopy.composition.filter(
            (composition, index) => indexof !== index
        );

        setGrowingMedium({ ...growingMediumCopy, composition: filtered });

        if (growingMedium.composition.length === 1) {
            setButtonDisabled(true);
        }
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

        if (!percentageIsOver100() && !nameExists()) {
            await saveGrowingMedium(growingMedium);

            setGrowingMedium({
                name: "",
                composition: [{ component: "", percentage: 100 }],
            });

            navigate(-1);
        }
    };

    return (
        <Form onSubmit={(event) => void handleSubmit(event)}>
            <Column padding="0 0 40px 0">
                {notification !== "" && (
                    <Notification>
                        <Row alignItems="center">
                            <PriorityHighIcon sx={{ fontSize: 26 }} />
                            {notification}
                        </Row>
                    </Notification>
                )}
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="growing-medium-name-input"
                    name="name"
                    onChange={handleMixNameChange}
                    value={growingMedium.name}
                    required
                />
                {growingMedium.composition.map((component, index) => {
                    return (
                        <StyledRow key={index} alignItems="start" margin="0 0 0.8rem 0" padding="">
                            <Column flex="4">
                                <Label htmlFor="component">
                                    Component #{index + 1}
                                </Label>
                                <StyledSelect
                                    id={`growing-medium-component-${index + 1
                                        }-select`}
                                    onChange={(event) =>
                                        handleChange(event, index)
                                    }
                                    name="component"
                                    value={
                                        growingMedium.composition[index]
                                            .component
                                    }
                                    required
                                >
                                    <option hidden>select...</option>
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
                                </StyledSelect>
                            </Column>

                            <Column flex="1">
                                <Label htmlFor="percentage">
                                    %
                                </Label>
                                <StyledInput
                                    type="number"
                                    id={`growing-medium-percentage-${index + 1
                                        }-input`}
                                    name="percentage"
                                    onChange={(event) =>
                                        handleChange(event, index)
                                    }
                                    value={
                                        growingMedium.composition[index]
                                            .percentage
                                    }
                                    required
                                    max="100"
                                    min="1"
                                />
                            </Column>
                            <Column flex="1">
                                <Label color="white">-</Label>
                                <StyledColorsIconButton
                                    type="button"
                                    onClick={() =>
                                        handleRemoveComponents(index)
                                    }
                                    margin="0 0 0 0.8rem"
                                    disabled={buttonDisabled}
                                >
                                    <HighlightOffIcon sx={{ fontSize: 20 }} />
                                </StyledColorsIconButton>
                            </Column>
                        </StyledRow>
                    );
                })}
                <StyledColorsIconButton
                    type="button"
                    id="growing-medium-add-more-components-btn"
                    onClick={handleAddMoreComponents}
                    margin="0 0 0.8rem 0"
                >
                    <AddCircleOutlineIcon sx={{ fontSize: 20 }} />
                </StyledColorsIconButton>
                <Button
                    type="submit"
                    id="growing-medium-submit-btn"
                    width="calc(100vw - 32px)"
                    flex="none"
                >
                    Save
                </Button>
            </Column>
        </Form >
    );
};

export default GrowingMediumForm;
