import { useState, useEffect } from "react";

import axios from "axios";

import { GrowingMedium } from "../types";

export const useGrowingMediums = () => {
    const [growingMediums, setGrowingMediums] = useState<GrowingMedium[]>([]);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

        const fetchData = async () => {
            const response = await axios.get<GrowingMedium[]>(
                `${baseUrl}/growing-mediums`
            );
            setGrowingMediums(response.data);
        };

        try {
            void fetchData();
        } catch (error) {
            throw new Error("Could not fetch growing mediums");
        }
    }, []);

    const addGrowingMedium = (growingMedium: GrowingMedium) => {
        setGrowingMediums([...growingMediums, growingMedium]);
    };

    return {
        growingMediums,
        addGrowingMedium,
    };
};
