import { useState } from "react";

import { GrowingMedium, TempGrowingMedium } from "../types";

import Button from "./style/Generics/Button";
import Column from "./style/Generics/Column";
import Form from "./style/Generics/Form";
import Row from "./style/Generics/Row";
import Select from "./style/Generics/Select";
import Input from "./style/Generics/Input";
import Label from "./style/Generics/Label";

interface Props {
    growingMediums: GrowingMedium[];
}

const GrowingMediumForm = ({ growingMediums }: Props) => {
    const [growingMedium, setGrowingMedium] = useState<TempGrowingMedium>({
        name: "",
        composition: [],
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

    return (
        <Form>
            <Column>
                <Label htmlFor="growingMedium">Growing medium</Label>
            </Column>
            <Label htmlFor="mixName">Mix name</Label>
            <Input
                type="text"
                name="mixName"
                onChange={handleMixNameChange}
                value={growingMedium.name}
            />
            {growingMedium.composition.map((component, index) => {
                return (
                    <Row key={index}>
                        <Column flex={1}>
                            <Label htmlFor="component">
                                Component #{index + 1}
                            </Label>
                            <Select
                                onChange={(event) => handleChange(event, index)}
                                name="component"
                            >
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
                        {growingMedium.composition.length !== 1 && (
                            <Column>
                                <Label htmlFor="percentage">Percentage</Label>
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
                        )}
                        <Column>
                            <Label color="white">+</Label>
                            <Button
                                type="button"
                                onClick={handleAddMoreComponents}
                            >
                                +
                            </Button>
                        </Column>
                        {growingMedium.composition.length !== 1 && (
                            <Column>
                                <Label color="white">-</Label>
                                <Button
                                    type="button"
                                    onClick={handleRemoveComponents}
                                >
                                    -
                                </Button>
                            </Column>
                        )}
                    </Row>
                );
            })}

            <Button type="submit">Save growing medium</Button>
        </Form>
    );
};

export default GrowingMediumForm;
