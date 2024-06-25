import _ from "lodash";

export const notificationErrorHandler = (duration, unit) => {
    if (duration === "") {
      return true;
    }

    switch (unit) {
      case "days":
        if (_.inRange(parseInt(duration, 10), 0, 29)) return false;
        else return true;

      case "weeks":
        if (_.inRange(parseInt(duration, 10), 0, 5)) return false;
        else return true;
      case "minutes":
        if (_.inRange(parseInt(duration, 10), 0, 40321)) return false;
        else return true;
      case "hours":
        if (_.inRange(parseInt(duration, 10), 0, 673)) return false;
        else return true;
      default:
        return false;
    }
  };