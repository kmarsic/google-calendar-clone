import { useContext } from "react";
import { EventDataContext } from "../../../formContext";
import { NotificationTypeSelect } from "./NotificationTypeSelect";
import { NumberInput } from "./NotificationNumberInput";
import { NotificationUnitSelect } from "./NotificationUnitSelect";
import { NotificationTimeSelect } from "./NotificationTimeSelect";
import { NotificationFooter } from "./NotificationFooter";

export function NotificationModal({ onClose }) {
  const formData = useContext(EventDataContext);

  return (
    <>
      <div className="overlay dark" onClick={onClose}></div>
      <div className="notification-modal-container">
        <h3 className="notification-modal-title">Custom notification</h3>
        <div className="notification-select">
          <NotificationTypeSelect />
          <NumberInput />
          <NotificationUnitSelect />
          {formData.allDay === true ? <NotificationTimeSelect /> : null}
        </div>
        <NotificationFooter onClose={() => onClose(false)} />
      </div>
    </>
  );
}
