//Plant model before saving
export interface TempPlant {
    name: string;
    soil: string;
    lastWatered: string;
    wateringCycle: number;
    imageName: string;
}

//Plant model after saving
export interface Plant extends TempPlant {
    id: string;
}

//TODO: set values for soil
