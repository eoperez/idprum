import { ConstructionOutlined } from "@mui/icons-material";
import { createContext, FC, useContext, useReducer } from "react";
import { NotificationState, NotificationAction, NotificationContextType } from "../Types/Notifications";

const initialNotificationState: NotificationState = {
    type: 'info',
    message: 'Welcome back!',
    isActive: true
}

const NotificationContext = createContext<NotificationContextType>({
    notificationState: initialNotificationState,
    notificationDispatch: () => null
});

const notificationReducer = (notificationState: NotificationState, action: NotificationAction) => {
    switch (action.type) {
        case 'setIsActive':
            return {...notificationState, isActive: action.payload.isActive};
        case 'setMessage':
            return {...notificationState, message: action.payload.message};
        case 'setType':
            return {...notificationState, type: action.payload.type};
        case 'setNotification':
            return {...notificationState, 
                isActive: action.payload.isActive,
                message: action.payload.message,
                type: action.payload.type
            };
        default:
            return notificationState
    }
}

const NotificationContextProvider: FC = ({ children }) => {

    const [notificationState, notificationDispatch] = useReducer(notificationReducer, initialNotificationState);

    return (
        <NotificationContext.Provider value={{notificationState, notificationDispatch}}>{ children }</NotificationContext.Provider>
    )
}

export {NotificationContextProvider, NotificationContext}