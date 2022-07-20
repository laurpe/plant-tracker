import { useEffect, useState } from "react";

import { GrowingMedium } from "../types";
import { useAPIData } from "./useAPIData";

export const useGrowingMediums = () => {
    const [growingMediums, setGrowingMediums] = useState<GrowingMedium[]>([]);
    const data = useAPIData<GrowingMedium[]>("growing-mediums");

    useEffect(() => {
        if (data) {
            setGrowingMediums(data);
        }
    }, [data]);

    const addGrowingMedium = (growingMedium: GrowingMedium) => {
        setGrowingMediums([...growingMediums, growingMedium]);
    };

    return {
        growingMediums,
        addGrowingMedium,
    };
};
