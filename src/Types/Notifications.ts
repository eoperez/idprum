import { AlertColor } from "@mui/material";
import { Dispatch } from "react";

export interface NotificationState {
    isActive: boolean;
    type?: AlertColor;
    message?: string;
    callback?: (payload: object) => void;
}

export interface NotificationAction {
    type: string;
    payload: NotificationState;
}

export interface NotificationContextType {
    notificationState: NotificationState;
    notificationDispatch: Dispatch<NotificationAction>;
}