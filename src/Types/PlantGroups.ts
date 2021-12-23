import { Dispatch } from "react";
import { Pest } from "./Pests";
import { Symptom } from "./Symptoms";

export interface PlantGroup {
    id: string;
    commonName: string;
    scientificName: string;
    description: string;
    location: string;
    soilType: string;
    isInDanger: boolean;
    specie: string;
    treatments?: Treatment[];
    symptoms?: Partial<Symptom>[];
    pests?: Partial<Pest>[];
}

export interface Treatment {
    id?: string;
    name: string;
    itWorked?: boolean;
}

export interface TreatmentDialog extends Treatment {
    inputValue?: string;
}

export interface PlantGroupFormProps {
    treatments: Treatment[];
    symptoms: Partial<Symptom>[];
    pests: Partial<Pest>[];
    recordToEdit: PlantGroup | undefined;
    handleDrawerClose: () => void;
    handleAddEditAction: (action: string, targetRecord: any) => void;
}

export interface PlantGroupsState {
    activePlantGroup?: PlantGroup;
    plantGroupsCollection: PlantGroup[];
}

export interface PlantGroupsAction  {
    type: string;
    payload: any;
}

export interface PlantGroupsContextType{
    plantGroupsState: PlantGroupsState;
    plantGroupsDispatch: Dispatch<PlantGroupsAction>;
}