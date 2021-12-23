import { Dispatch } from "react";

export interface Treatment {
    id?: string;
    name: string;
    itWorked?: boolean;
}

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