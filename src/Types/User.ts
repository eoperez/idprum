import { Dispatch, ReducerAction } from "react";

export interface ActiveUserState {
    isAuthenticated: boolean
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
}

