import { createContext, FC, useReducer } from "react";
import { Treatment } from "../Types/PlantGroups";
import { TreatmentAction, TreatmentsState, TreatmentContextType } from "../Types/Treatments";

// TODO: use axios to get all 
let treatmentsCollectionInitial: Treatment[] = []
for (let index = 0; index < 50; index++) {
    const rid = (Math.random() + 1).toString(36).substring(7);
    treatmentsCollectionInitial.push(
        {
            id: rid,
            name: `Agua a ${index}ml`,
            itWorked: false
        }
    );

}

const initialTreatmentsState: TreatmentsState = {
    treatmentsCollection: treatmentsCollectionInitial
};

const TreatmentsContext = createContext<TreatmentContextType>({
    treatmentsState: initialTreatmentsState,
    treatmentsDispatch: () => null
});

const treatmentsReducer = (treatmentsState: TreatmentsState, action: TreatmentAction) => {
    switch (action.type) {
        case 'getSTreatments':
            return treatmentsState;
        
        case 'insertTreatment':
            treatmentsState.treatmentsCollection.push(action.payload);
            return treatmentsState;
        
        case 'getTreatmentByName':
            const newActiveTreatment = treatmentsState.treatmentsCollection.find(treatmentObject => treatmentObject.name === action.payload.name);
            console.log(newActiveTreatment)
            return {...treatmentsState, 
                activeTreatment: newActiveTreatment
            }
        default:
            return treatmentsState;
    }
    
}

const TreatmentsContextProvider: FC = ({ children }) => {
    const [treatmentsState, treatmentsDispatch] = useReducer(treatmentsReducer, initialTreatmentsState);
    return (
        <TreatmentsContext.Provider value={{treatmentsState, treatmentsDispatch}}>{ children }</TreatmentsContext.Provider>
    );
}

export {TreatmentsContextProvider, TreatmentsContext};