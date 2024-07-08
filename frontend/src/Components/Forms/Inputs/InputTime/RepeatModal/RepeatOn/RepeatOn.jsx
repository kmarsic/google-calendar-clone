import { useContext, useState } from "react"
import { RepeatStateContext } from "../RepeatModal"
import { RepeatWeekly } from "./RepeatWeekly";
import { RepeatMonthly } from "./RepeatMonthly";

export function RepeatOn() {
    const stateContext = useContext(RepeatStateContext);

    if (stateContext.every === "days" || stateContext.every === "years") {
        return;
    } else if (stateContext.every === "weeks") {
        return <RepeatWeekly/>
    } else if (stateContext.every === "months") {
        return <RepeatMonthly/>
    }

}