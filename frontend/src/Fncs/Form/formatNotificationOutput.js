import { hourTimeFormat } from "./timeFormat";

export const formatNotificationOutput = (notification, formData) => {
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