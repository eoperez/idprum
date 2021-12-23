import { Dispatch } from "react";

export interface Pest {
    id: string;
    commonName: string;
    scientificName: string;
    description: string;
    appearance: Appearance;
    origins: Array<string>;
    treatments?: Array<string>;
    symptoms?: Array<string>;
}

export interface Appearance {
    imageUrl?: string;
    description: string;
}

export interface Phases {
    name: string;
    description: string;
    imageUrl?: string;
}

export interface PestsState {
    activePest?: Pest;
    pestsCollection: Pest[];
}

export interface PestAction  {
    type: string;
    payload: Pest;
}

export interface PestsContextType{
    pestsState: PestsState;
    pestsDispatch: Dispatch<PestAction>;
}