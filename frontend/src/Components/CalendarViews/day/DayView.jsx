/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { currentDate, setView, switchView } from "../../../redux/features/dateSlicer";
import { DaytimeGrid } from "../DaytimeGrid";
import { WeekDays } from "../week/WeekDays";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function DayView() {
    const switches = useSelector(switchView);
    const mainDate = new Date(useSelector(currentDate));
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setView(location.pathname.substring(1)))
    }, []);

    const day = mainDate.getDay();
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date();
    const showTimeFrames = () => {
        const times = [];
        for (let i = 1; i <= 12; i++) {
            times.push(
                <div key={"ta" + i} className="time-frame">
                    <span className="time">{i} AM</span>
                </div>
            )
        }
        for (let i = 1; i <= 11; i++) {
            times.push(
                <div key={"tp" + i} className="time-frame">
                    <span className="time">{i} PM</span>
                </div>
            )
        }
        return times;
    }
    return (
        <motion.div 
        className="week-view"
        key={mainDate}
        variants={calendarVariant}
        initial={switches == "prev" ? "hidden" : "hiddenNext"}
        animate={"visible"}
        exit={"exit"}>
            <div className="week-nav">
                <div></div>
                <div className="nav-grid-day">
                    <div className="gmt">GMT+01</div>
                    <div className="single-day">
                        <WeekDays day={dayNames[day]} date={mainDate} today={today}/>
                        <div className="nav-border-div"></div>
                    </div>
                    
                </div>
            </div>
            <div className="week-cal-body">
                <div className="time-frames">{showTimeFrames()}</div>
                <div className="day-cal-grid">
                    <DaytimeGrid iterator={0} date={mainDate}/>
                </div>
            </div>
        </motion.div>
    )
}