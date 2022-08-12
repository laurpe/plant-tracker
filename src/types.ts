// Plant model before saving
export interface TempPlant {
    name: string;
    growingMedium: string;
    lastWatered: string;
    wateringCycle: number;
    imageName: string;
}

export interface TempPlantNoGrowingMedium {
    name: string;
    lastWatered: string;
    wateringCycle: number;
    imageName: string;
}

// Plant model after saving
export interface Plant extends TempPlant {
    id: string;
}

// Growing medium
export interface Component {
    component: string;
    percentage: number;
}

// Growing medium before saving
export interface TempGrowingMedium {
    name: string;
    composition: Component[];
}

// Growing medium after saving
export interface GrowingMedium extends TempGrowingMedium {
    id: string;
}

// User before saving
export interface TempUser {
    email: string;
    password: string;
}

// User after saving
export interface User extends Omit<TempUser, "password"> {
    token: string;
}


