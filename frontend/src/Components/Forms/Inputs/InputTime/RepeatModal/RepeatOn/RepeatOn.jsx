import { useContext } from "react"
import { RepeatDataContext } from "../RepeatModal"
import { RepeatWeekly } from "./RepeatWeekly";
import { RepeatMonthly } from "./RepeatMonthly";

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