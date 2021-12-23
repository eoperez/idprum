
import { createContext, FC, useReducer } from "react";
import { PestAction, PestsState, Pest, PestsContextType } from "../Types/Pests";

// TODO: use axios to get all 
let pestsCollectionInitial: Pest[] = []
for (let index = 0; index < 50; index++) {
    const rid = (Math.random() + 1).toString(36).substring(7);
    pestsCollectionInitial.push(
        {
            id: rid,
            commonName: `${index} Gusano de Gandul`,
            scientificName: 'gandulitis',
            description: 'Insector dañino',
            appearance: {
                description: 'Feo per muy feo'
            },
            origins: [''],
        }
    );

}

const initialPestsState: PestsState = {
    pestsCollection: pestsCollectionInitial
};

const PestsContext = createContext<PestsContextType>({
    pestsState: initialPestsState,
    pestsDispatch: () => null
});

const pestsReducer = (pestsState: PestsState, action: PestAction) => {
    switch (action.type) {
        case 'getPests':
            return pestsState;
        
        case 'insertPest':
            pestsState.pestsCollection.push(action.payload);
            return pestsState;
        
        case 'getPest':
            return {...pestsState, 
                activePest: pestsState.pestsCollection.find(pestObject => pestObject.id === action.payload.id)
            }
        default:
            return pestsState;
    }
    
}

const PestsContextProvider: FC = ({ children }) => {
    const [pestsState, pestsDispatch] = useReducer(pestsReducer, initialPestsState);
    return (
        <PestsContext.Provider value={{pestsState, pestsDispatch}}>{ children }</PestsContext.Provider>
    );
}

export {PestsContextProvider, PestsContext};