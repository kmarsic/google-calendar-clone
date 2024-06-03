import { useContext } from "react";
import { NotificationChangeContext } from "../../../formContext";

export function NotificationFooter ({handleSubmit}) {
    const setNotification = useContext(NotificationChangeContext);

    const onClose = () => {
        setNotification({type: "modal", payload: false})
    }

    return (
        <div className="div-flex" style={{marginTop: "30px", justifyContent: "right"}}>
            <button onClick={onClose} className="btn-big">Cancel</button>
            <button onClick={() => handleSubmit()} className="btn-main-transparent btn-big">Done</button>
        </div>
    )
}