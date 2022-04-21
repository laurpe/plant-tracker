//Plant model before saving
export interface TempPlant {
    name: string;
    soil: string;
    lastWatered: Date;
    wateringCycle: number;
}

//Plant model after saving
export interface Plant extends TempPlant {
    id: string;
}
