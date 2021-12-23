import { createContext, FC, useContext, useState } from "react";
import { ActiveUserState } from "../Types/User"

// TODO: Get user info from window context 

const initialUserState: ActiveUserState = {
    isAuthenticated: true,
    userId: 'eoperez',
    email: 'edwin.perez@gmail.com',
    firstName: 'Edwin',
    lastName: '{Perez}'
};

const UserContext = createContext(initialUserState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: FC = ({ children }) => {
    return (
        <UserContext.Provider value={initialUserState}>{children}</UserContext.Provider>
    );
};