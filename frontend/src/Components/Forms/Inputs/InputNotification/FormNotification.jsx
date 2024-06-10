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
import { formatNotificationOutput } from "../../../../Fncs/indexFncs";

export function FormNotification({ list, updateArray, uuid }) {
  const formData = useContext(EventDataContext);
  const dropdownRef = useRef(null);

  const [currentNotification, setCurrentNotification] = useState({
    type: "Notification",
    duration: "",
    unit: "days",
    time: formData.startDate + 60000 * 60 * 9,
  });

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

  //Array of dropdown options for when allDay isn't checked
  const options = [
    { unit: "minutes", duration: "5" },
    { unit: "minutes", duration: "10" },
    { unit: "minutes", duration: "15" },
    { unit: "minutes", duration: "30" },
    { unit: "hours", duration: "1" },
    { unit: "days", duration: "1" },
    {
      unit: customNotificationData.unit,
      duration: customNotificationData.duration,
      visible: customNotificationData.visible,
      custom: true,
    },
    "Custom...",
  ];

  //Options when allDay is checked
  const allDayOptions = [
    { unit: "days", duration: "0", time: formData.startDate + 60000 * 60 * 9 },
    { unit: "days", duration: "1", time: formData.startDate + 60000 * 60 * 9 },
    { unit: "days", duration: "2", time: formData.startDate + 60000 * 60 * 9 },
    { unit: "weeks", duration: "1", time: formData.startDate + 60000 * 60 * 9 },
    {
      unit: customNotificationData.unit,
      duration: customNotificationData.duration,
      time: customNotificationData.time,
      visible: customNotificationData.visible,
      custom: true,
    },
    "Custom...",
  ];

  function mappedList() {
    if (formData.allDay) {
      return allDayOptions;
    } else return options;
  }

  function checkVisible() {
    const unit = customNotificationData.unit;
    const duration = customNotificationData.duration;
    const time = customNotificationData.time;
    if (customNotificationData.visible === false) return;
    for (let option of mappedList()) {
      if (option.custom === true) return;
      if (unit === option.unit && duration === option.duration) {
        if (option.time) {
          if(option.time === time) {
            dispatchReducer({ type: "visible", payload: false });
          }
        }
      }
    }
  }

  useEffect(() => {
    checkVisible();
  }, [customNotificationData]);

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
  console.log(customNotificationData.dropdown)

  return (
    <NotificationContext.Provider value={customNotificationData}>
      <NotificationChangeContext.Provider value={dispatchReducer}>
        <div className="input-shell">
          <div>
            <span
              className="dropdown-container"
              ref={dropdownRef}
              onMouseDown={() =>
                dispatchReducer({
                  type: "dropdown",
                  payload: !customNotificationData.dropdown,
                })
              }
            >
              <span>
                {formatNotificationOutput(currentNotification, formData)}
              </span>
              <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" />
            </span>
            {customNotificationData.dropdown ? (
                <NotificationDropdown
                  format={formatNotificationOutput}
                  container={dropdownRef}
                  setNotification={setCurrentNotification}
                  currentNotification={currentNotification}
                  list={mappedList()}
                />
              ) : null}
          </div>
          {customNotificationData.modal
            ? createPortal(
                <NotificationModal
                  setCurrentNotification={setCurrentNotification}
                />,
                document.body
              )
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
