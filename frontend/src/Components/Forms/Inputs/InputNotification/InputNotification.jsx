import { useContext, useEffect, useState } from "react";
import { FormNotification } from "./FormNotification";
import { EventChangeContext } from "../../formContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function InputNotification() {
  const [notifications, setNotifications] = useState([]);
  const [notificationArray, setNotificationArray] = useState([]);

  const handleRemoveNotification = (rmnotification) => {
    const id = rmnotification.props.uuid
    const newNotifications = notifications.filter(
      (notification) => notification !== rmnotification
    );
    setNotifications(newNotifications);

    const newNotificationArray = notificationArray.filter(notification => {
      return notification.unique !== id
    });
    setNotificationArray(newNotificationArray);
  };

  const dispatchReducer = useContext(EventChangeContext);

  useEffect(() => {
    dispatchReducer({ type: "notifications", payload: notificationArray });
  }, [notificationArray]);

  function getNotificationPermission() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") return
    else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        
        if (permission === "granted") {
          const notification = new Notification(
            "This is how your notifications will appear"
          );
          // …
        }
      });
    }
  }

  const handleNotifications = () => {
    if (notifications.length > 4) {
      return;
    } else {
      setNotifications([
        ...notifications,
        <FormNotification
          key={notifications.length}
          uuid={notifications.length}
          list={notificationArray}
          updateArray={setNotificationArray}
        />,
      ]);
    }
  };

  return (
    <div className="input-shell">
      <div>{notifications.map((option) => {
              return (
                <div className="div-flex">
                {option}
                <FontAwesomeIcon
                  className="btn-round"
                  icon={faXmark}
                  color="var(--text-body)"
                  onClick={() => handleRemoveNotification(option)}
                />
                </div>
              )
        })}</div>
      <div onClick={() => {handleNotifications(); getNotificationPermission()}}>
        <span className="dropdown-container">Add notification</span>
      </div>
    </div>
  );
}
