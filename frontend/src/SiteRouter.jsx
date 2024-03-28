import { Routes, Route } from "react-router-dom";
import { MonthView } from "./Components/CalendarViews/MonthView/MonthView";
import { YearView } from "./Components/CalendarViews/Year/YearView";
import { WeekView } from "./Components/CalendarViews/week/WeekView";
import { DayView } from "./Components/CalendarViews/day/DayView";

export function SiteRouter() {   
    return (
        <Routes>
            <Route path="/" element={<MonthView />} />
            <Route path="*" element={<MonthView />} />
            <Route path="/Month" element={<MonthView />} />
            <Route path="/Year" element={<YearView />} />
            <Route path="/Week" element={<WeekView />} />
            <Route path="/Day" element={<DayView />} />
        </Routes>
    )
}