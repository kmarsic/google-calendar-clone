import { useEffect, useRef, useState, useReducer, useContext } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSliders } from "@fortawesome/free-solid-svg-icons";
import { NotificationDropdown } from "./NotificationDropdown";
import { NotificationModal } from "./NotificationModal/NotificationModal";
import {
  EventDataContext,
  NotificationChangeContext,
  NotificationContext,
} from "../../formContext";
import {
  hourTimeFormat,
  notificationErrorHandler,
} from "../../../../Fncs/indexFncs";

export function FormNotification({ list, updateArray }) {
  const formData = useContext(EventDataContext);
  const portaledDiv = document.getElementById("root");

  const dropdownRef = useRef(null);

  const [notificationData, dispatchReducer] = useReducer(reducer, {
    dropdown: false,
    modal: false,
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
    updateArray([...list, notificationData]);
  }, []);

  useEffect(() => {
    updateArray((prevList) =>
      prevList.map((notification) =>
        notification.id === notificationData.id
          ? notificationData
          : notification
      )
    );
  }, [notificationData]);

  return (
    <NotificationContext.Provider value={notificationData}>
      <NotificationChangeContext.Provider value={dispatchReducer}>
        <div className="input-shell">
          <div>
            <span
              className="dropdown-container"
              ref={dropdownRef}
              onClick={() =>
                dispatchReducer({
                  type: "dropdown",
                  payload: !notificationData.dropdown,
                })
              }
            >
              <span>{formatOutput(notificationData)}</span>
              <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" />
              {notificationData.dropdown ? (
                <NotificationDropdown
                  setDropdown={handleButtonClick}
                  format={formatOutput}
                  container={dropdownRef}
                />
              ) : null}
            </span>
          </div>
          {notificationData.modal
            ? createPortal(<NotificationModal />, portaledDiv)
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
      return { ...state, visible: true };
    case "error":
      return { ...state, error: notificationErrorHandler(state.duration, state.unit) };
    default:
      return state;
  }
}
