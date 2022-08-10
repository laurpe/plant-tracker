import React, { useState } from "react";
import axios from "axios";

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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';

import styled from "styled-components";
import { useGrowingMediums } from "../hooks/useGrowingMediums";
import { useUser } from "../hooks/useUser";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

const StyledColorsIconButton = styled(IconButton)`
    color: #ea5c5c;
    border-radius: 50%;
    height: 3.4rem;
    width: 2.85rem;
`;

const AddButton = styled.button`
    height: 56px;
    width: 100%;
    font-family: inherit;
    font-size: 1.2rem;
    background-color: white;
    border: none;
    border-bottom: 1px solid #b9ccca;
    color: #7b9c99;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.6rem 0 0.8rem;
    margin-bottom: 2rem;
`

const StyledInput = styled.input`
    border: none;
    font-family: inherit;
    color: inherit;
    font-size: 1.2rem;
    color: #225c55;
    width: 100%;
    appearance: none;
    min-height: 1.5rem;
`

const StyledSelect = styled.select`
    border: none;
    font-family: inherit;
    font-size: 1.2rem;
    color: #225c55;
    padding: 0.8rem 0.8rem 0.9rem 0;
    height: 3.5rem;
`

const StyledRow = styled(Row)`
    border-bottom: 1px solid #b9ccca;
`

const StyledColumn = styled(Column)`
    padding: 16px 0 40px 0;
    border-radius: 20px 20px 0 0;
    margin-top: -40px;
    background-color: white;
`

interface Props {
    hideGrowingMediumForm: () => void;
    growingMediums: GrowingMedium[];
    addGrowingMedium: (growingMedium: GrowingMedium) => void;
}

const GrowingMediumForm = ({ hideGrowingMediumForm, growingMediums, addGrowingMedium }: Props) => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [growingMedium, setGrowingMedium] = useState<TempGrowingMedium>({
        name: "",
        composition: [{ component: "", percentage: 100 }],
    });
    const [notification, setNotification] = useState<string>("");

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

        if (growingMedium.composition.length === 4) {
            setNotification("Can't add more than 4 components");
            return;
        }

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

            hideGrowingMediumForm();
        }
    };

    return (
        <Form onSubmit={(event) => void handleSubmit(event)}>
            <StyledColumn>
                {notification !== "" && (
                    <Notification>
                        <Row alignItems="center">
                            <PriorityHighIcon sx={{ fontSize: 26 }} />
                            {notification}
                        </Row>
                    </Notification>
                )}
                <Label htmlFor="name">Growing medium name</Label>
                <Input
                    type="text"
                    id="growing-medium-name-input"
                    name="name"
                    onChange={handleMixNameChange}
                    value={growingMedium.name}
                    required
                />
                <Label>Components</Label>
                {growingMedium.composition.map((component, index) => {
                    return (
                        <StyledRow key={index} alignItems="center">
                            <Column flex="1">
                                <StyledColorsIconButton
                                    type="button"
                                    onClick={() =>
                                        handleRemoveComponents(index)
                                    }
                                    disabled={buttonDisabled}
                                >
                                    <RemoveCircleIcon sx={{ fontSize: 20 }} />
                                </StyledColorsIconButton>
                            </Column>
                            <Column flex="6">
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

                            <Column flex="1.3" padding="0 0 0 2.4rem">
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
                            <Column flex="0.5" padding="0 0.6rem 0 0">
                                %
                            </Column>
                        </StyledRow>
                    );
                })}
                <AddButton type="button" onClick={() => handleAddMoreComponents()}>
                    <p>Add another component</p>
                    <AddIcon sx={{ fontSize: 26 }} />
                </AddButton>
                <Button
                    type="submit"
                    id="growing-medium-submit-btn"
                    width="calc(100vw - 32px)"
                    flex="none"
                >
                    Save
                </Button>
            </StyledColumn>
        </Form >
    );
};

export default GrowingMediumForm;
