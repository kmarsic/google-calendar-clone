import { useContext } from "react"
import { RepeatWeekly } from "./RepeatWeekly";
import { RepeatMonthly } from "./RepeatMonthly";
import { RepeatDataContext } from "../InputRepeat";

export function RepeatOn() {
    const dataContext = useContext(RepeatDataContext);
  
    switch (dataContext.unit) {
      case "days":
      case "years":
        return null;
  
      case "weeks":
        return <RepeatWeekly />;
  
      case "months":
        return <RepeatMonthly />;
  
      default:
        return null;
    }
  }