import { Alert, Snackbar } from '@mui/material'
import { useContext } from 'react'
import { NotificationContext } from '../../Contexts/Notification'

export const AppNoficiation = () => {
    const {notificationState, notificationDispatch} = useContext(NotificationContext);
    const handleConfirmation = () => {
        notificationDispatch({type: 'setIsActive', payload: {isActive: false}});
    }
    return (
        <Snackbar open={notificationState.isActive} autoHideDuration={6000} onClose={handleConfirmation}>
            <Alert onClose={handleConfirmation} severity={notificationState.type} sx={{ width: '100%' }}>
              {notificationState.message}
            </Alert>
        </Snackbar>
    )
}
