import { findFirstDay } from "./findFirstDay";
import { findMonthDays } from "./findMonthDays";

export const gridRule = (mainDate) => {
    const month = mainDate.getMonth();
    const year = mainDate.getFullYear();
    if (
        findFirstDay(year, month) == 5 &&
        findMonthDays(year, month) == 30
    ) {
        return false;
    } else if (
        findFirstDay(year, month) > 4 &&
        findMonthDays(year, month) >= 30
    ) {
        return true;
    }
    return false;
};