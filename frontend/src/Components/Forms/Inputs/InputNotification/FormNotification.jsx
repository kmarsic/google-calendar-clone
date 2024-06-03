import { useEffect, useRef, useReducer, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { NotificationDropdown } from "./NotificationDropdown";
import { NotificationModal } from "./NotificationModal/NotificationModal";
import {
  EventDataContext,
  NotificationChangeContext,
  NotificationContext,
} from "../../formContext";
import { hourTimeFormat } from "../../../../Fncs/indexFncs";

export function FormNotification({ list, updateArray, uuid}) {
  const formData = useContext(EventDataContext);
  const portaledDiv = document.getElementById("root");
  const dropdownRef = useRef(null);

  const [currentNotification, setCurrentNotification] = useState({
    type: "Notification",
    duration: "1",
    unit: "days",
    time: formData.startDate + 60000 * 60 * 9,
  })

  const [customNotificationData, dispatchReducer] = useReducer(reducer, {
    dropdown: false,
    modal: false,
    unique: uuid,
    id: new Date().getTime(),
    type: "Notification",
    duration: "1",
    unit: "days",
    time: formData.startDate + 60000 * 60 * 9,
    visible: false,
    error: false,
  });

  const formatOutput = (notification) => {
    if (notification === "Custom...") return;
    let unit = notification.unit;
    if (notification.duration <= 1) {
      unit = unit.slice(0, -1);
    }

    if (formData.allDay) {
      if (notification.duration == 0) {
        return `On the same day at ${hourTimeFormat(
          new Date(notification.time)
        )}`;
      } else {
        return `${notification.duration} ${unit} before at ${hourTimeFormat(
          new Date(notification.time)
        )}`;
      }
    } else {
      if (notification.duration == 0) {
        return "When event starts";
      } else {
        return `${notification.duration} ${unit} before`;
      }
    }
  };
  const handleButtonClick = (e) => {
    if (e.target.closest(".repeat-dropdown")) {
      dispatchReducer({ type: "dropdown", payload: !state.dropdown });
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.tagName !== "LI" || dropdownRef.current.contains(e.target)) {
      dispatchReducer({ type: "dropdown", payload: false });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    updateArray([...list, customNotificationData]);
  }, []);

  useEffect(() => {
    updateArray((prevList) =>
      prevList.map((notification) =>
        notification.id === customNotificationData.id
          ? customNotificationData
          : notification
      )
    );
  }, [customNotificationData]);

  return (
    <NotificationContext.Provider value={customNotificationData}>
      <NotificationChangeContext.Provider value={dispatchReducer}>
        <div className="input-shell">
          <div>
            <span
              className="dropdown-container"
              ref={dropdownRef}
              onClick={() =>
                dispatchReducer({
                  type: "dropdown",
                  payload: !customNotificationData.dropdown,
                })
              }
            >
              <span>{formatOutput(currentNotification)}</span>
              <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" />
              {customNotificationData.dropdown ? (
                <NotificationDropdown
                  setDropdown={handleButtonClick}
                  format={formatOutput}
                  container={dropdownRef}
                  setNotification={setCurrentNotification}
                  currentNotification={currentNotification}
                />
              ) : null}
            </span>
          </div>
          {customNotificationData.modal
            ? createPortal(<NotificationModal setCurrentNotification={setCurrentNotification} />, portaledDiv)
            : null}
        </div>
      </NotificationChangeContext.Provider>
    </NotificationContext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "modal":
      return { ...state, modal: action.payload };
    case "dropdown":
      return { ...state, dropdown: action.payload };
    case "type":
      return { ...state, type: action.payload };
    case "duration":
      return { ...state, duration: action.payload };
    case "unit":
      return { ...state, unit: action.payload };
    case "time":
      return { ...state, time: action.payload };
    case "visible":
      return { ...state, visible: action.payload };
    default:
      return state;
  }
}
