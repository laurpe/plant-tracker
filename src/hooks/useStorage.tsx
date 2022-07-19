import { useEffect, useState } from "react";

import { State } from "../types";

export const useStorage = () => {
    const [storage, setStorage] = useState<State>({
        plants: [],
        growingMediums: [],
    });

    useEffect(() => {
        const state = localStorage.getItem("state");

        if (state) {
            const stateObject = JSON.parse(state) as State;

            setStorage(stateObject);
        } else {
            localStorage.setItem(
                "state",
                JSON.stringify({ plants: [], growingMediums: [] })
            );
        }
    }, []);

    const setStorageItems = (items: State) => {
        localStorage.setItem("state", JSON.stringify(items));
        setStorage(items);
    };

    return [storage, setStorageItems] as const;
};
