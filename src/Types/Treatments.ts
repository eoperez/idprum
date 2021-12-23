import { Dispatch } from "react";
import { Treatment } from "./PlantGroups";

export interface TreatmentsState {
    activeTreatment?: Treatment;
    treatmentsCollection: Treatment[];
}

export interface TreatmentAction  {
    type: string;
    payload: any;
}

export interface TreatmentContextType{
    treatmentsState: TreatmentsState;
    treatmentsDispatch: Dispatch<TreatmentAction>;
}