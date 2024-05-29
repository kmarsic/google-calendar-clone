import { useContext, useEffect, useState } from "react"
import { FormNotification } from "./FormNotification";
import { EventChangeContext } from "../../formContext";

export function InputNotification() {
    const [notifications, setNotifications] = useState([]);
    const [notificationArray, setNotificationArray] = useState([]);

    const dispatchReducer = useContext(EventChangeContext);

    useEffect(() => {
        dispatchReducer({type: "notifications", payload: notificationArray})
    }, [notificationArray]);

    // Check for notification support and request permission
    useEffect(() => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications");
        } else if (Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                }
            });
        }
    }, []);

    const showNotification = (title, options) => {
        if (Notification.permission === "granted") {
            new Notification(title, options);
        }
    };

    const handleNotifications = () => {
        if (notifications.length > 4) {
            return;
        } else {
            setNotifications([...notifications, <FormNotification key={notifications.length} list={notificationArray} updateArray={setNotificationArray}/>]);
            
            // Show browser notification when a new notification is added
            showNotification("New Notification Added", {
                body: `You have added notification number ${notifications.length + 1}`,
                icon: "path/to/icon.png" // Replace with a valid icon path if needed
            });
        }
    };

    return (
        <div className="input-shell">
            <div>{notifications.map(option => option)}</div>
            <div onClick={() => handleNotifications()}><span className="dropdown-container">Add notification</span></div>
        </div>
    )
}
