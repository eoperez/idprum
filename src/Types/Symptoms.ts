import { Dispatch } from "react";

export interface Symptom {
    id: string;
    name: string;
    description: string;
    color: string;
    size: string;
    texture: string;
    category?: string;
}

export interface SymptomsState {
    activeSymptom?: Symptom;
    symptomsCollection: Symptom[];
}

export interface SymptomsAction  {
    type: string;
    payload: any;
}

export interface SymptomsContextType{
    symptomsState: SymptomsState;
    symptomsDispatch: Dispatch<SymptomsAction>;
}