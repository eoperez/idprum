
import { createContext, FC, useReducer } from "react";
import { SymptomsAction, SymptomsContextType, SymptomsState, Symptom } from "../Types/Symptoms";

// TODO: use axios to get all symptoms
let symptomsCollection: Symptom[] = [];
for (let index = 0; index < 50; index++) {
    const rid = (Math.random() + 1).toString(36).substring(7);
    symptomsCollection.push(
        {
            id: rid,
            name: 'Descoloracion Nivel: ' + index,
            description: 'Descripcion para Descoloracion Nivel: ' + index,
            color: 'rojo',
            size: '1in',
            texture: 'suave',
            category: 'Descoloracion',
        }
    );

}

const initialSymptomsState: SymptomsState = {
    symptomsCollection: symptomsCollection
};

const SymptomsContext = createContext<SymptomsContextType>({
    symptomsState: initialSymptomsState,
    symptomsDispatch: () => null
});

const symptomsReducer = (symptomsState: SymptomsState, action: SymptomsAction) => {
    switch (action.type) {
        case 'getSymptoms':
            return symptomsState;
        
        case 'insertSymptoms':
            symptomsState.symptomsCollection.push(action.payload);
            return symptomsState;
        
        case 'getSymptom':
            return {...symptomsState, 
                activeSymptom: symptomsState.symptomsCollection.find(symptomObject => symptomObject.id === action.payload.id)
            }
        default:
            return symptomsState;
    }
    
}

const SymptomsContextProvider: FC = ({ children }) => {
    const [symptomsState, symptomsDispatch] = useReducer(symptomsReducer, initialSymptomsState);
    return (
        <SymptomsContext.Provider value={{symptomsState, symptomsDispatch}}>{ children }</SymptomsContext.Provider>
    );
}

export {SymptomsContextProvider, SymptomsContext};