import { useContext, useReducer } from "react";
import { EventDataContext, NotificationChangeContext, NotificationContext } from "../../../formContext";
import { NotificationTypeSelect } from "./NotificationTypeSelect";
import { NumberInput } from "./NotificationNumberInput";
import { NotificationUnitSelect } from "./NotificationUnitSelect";
import { NotificationTimeSelect } from "./NotificationTimeSelect";
import { NotificationFooter } from "./NotificationFooter";
import { notificationErrorHandler } from "../../../../../Fncs/indexFncs";

export function NotificationModal({ onClose, setCurrentNotification }) {
  const formData = useContext(EventDataContext);
  const dispatchReducer = useContext(NotificationChangeContext);
  const [modalState, setModalState] = useReducer(reducer,{
    type: "Notification",
    duration: "1",
    unit: "days",
    time: formData.startDate + 60000 * 60 * 9,
    error: false
  })

  const handleSubmit = () => {
    if (modalState.error === true) {
      return;
    }
    dispatchReducer({type: "type", payload: modalState.type})
    dispatchReducer({type: "duration", payload: modalState.duration})
    dispatchReducer({type: "unit", payload: modalState.unit})
    dispatchReducer({type: "time", payload: modalState.time})
    dispatchReducer({type: "visible", payload: true})
    dispatchReducer({type: "modal", payload: false})
    setCurrentNotification((prev) => ({
      ...prev,
      unit: modalState.unit,
      duration: modalState.duration,
      time: modalState.time,
  }))
  }

  return (
    <>
      <div className="overlay dark" onClick={onClose}></div>
      <div className="notification-modal-container">
        <h3 className="notification-modal-title">Custom notification</h3>
        <div className="notification-select">
          <NotificationTypeSelect setState={setModalState} state={modalState} />
          <NumberInput setState={setModalState} state={modalState} />
          <NotificationUnitSelect setState={setModalState} state={modalState} />
          {formData.allDay === true ? <NotificationTimeSelect state={modalState} dispatchReducer={setModalState} /> : null}
        </div>
        <NotificationFooter onClose={() => onClose(false)} handleSubmit={handleSubmit} />
      </div>
    </>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "type":
      return { ...state, type: action.payload };
    case "duration":
      return { ...state, duration: action.payload };
    case "unit":
      return { ...state, unit: action.payload };
    case "time":
      return { ...state, time: action.payload };
      case "error":
        return { ...state, error: notificationErrorHandler(state.duration, state.unit) };
      default:
        return state;
  }
}