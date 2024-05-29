import { useContext } from "react";
import { EventChangeContext, NotificationChangeContext, NotificationContext } from "../../../formContext";

export function NotificationFooter () {
    const dispatchReducer = useContext(EventChangeContext);
    const notificationData = useContext(NotificationContext);
    const setNotification = useContext(NotificationChangeContext);

    const onClose = () => {
        setNotification({type: "modal", payload: false})
    }

    const handleSubmit = () => {
        console.log(notificationData.error)
        if (notificationData.error === true) {
            return;
        } else {
            dispatchReducer({type: "notifications", payload: notificationData});
            onClose();
        }
    }

    return (
        <div className="div-flex" style={{marginTop: "30px", justifyContent: "right"}}>
            <button onClick={onClose} className="btn-big">Cancel</button>
            <button onClick={() => {handleSubmit()}} className="btn-main-transparent btn-big">Done</button>
        </div>
    )
}