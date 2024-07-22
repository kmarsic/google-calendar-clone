/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { currentDate, setView, switchView } from "../../../redux/features/dateSlicer";
import { DaytimeGrid } from "../DaytimeGrid";
import { WeekDays } from "../week/WeekDays";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";
import { TimeLegend } from "../TimeLegend";

export function DayView() {
    const switches = useSelector(switchView);
    const mainDate = new Date(useSelector(currentDate));

    const day = mainDate.getDay();
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date();

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
                    <WeekDays day={dayNames[day]} date={mainDate} today={today}/>
                    <div className="nav-border-div"></div>
                    
                </div>
            </div>
            <div className="week-cal-body">
                <div className="time-frames"><TimeLegend/></div>
                <div className="day-cal-grid">
                    <div className="hairline"></div>
                    <DaytimeGrid date={mainDate}/>
                </div>
            </div>
        </motion.div>
    )
}