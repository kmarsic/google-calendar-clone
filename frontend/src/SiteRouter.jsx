import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MonthView } from "./Components/CalendarViews/MonthView/MonthView";
import { YearView } from "./Components/CalendarViews/Year/YearView";
import { WeekView } from "./Components/CalendarViews/week/WeekView";
import { DayView } from "./Components/CalendarViews/day/DayView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentDate, setView } from "./redux/features/dateSlicer";

export function SiteRouter() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/Month");
        }
    }, [])

    useEffect(() => {
        dispatch(setView(location.pathname.substring(1)))
    }, [location.pathname])

    useEffect(() => {}, [])
    return (
        <Routes>
            <Route path="/" element={<MonthView />}/>
            <Route path="Month" element={<MonthView />} />
            <Route path="Year" element={<YearView />} />
            <Route path="Week" element={<WeekView />} />
            <Route path="Day" element={<DayView />} />
        </Routes>
    )
}