import { useSelector } from "react-redux"
import { currentDate, switchView } from "../../../redux/features/dateSlicer"
import { WeekDays } from "./WeekDays";
import { DaytimeGrid } from "../DaytimeGrid";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";

export function WeekView() {
    const mainDate = new Date(useSelector(currentDate));
    const switches = useSelector(switchView);
    
    const showWeekGrid = () => {
        const grid = [];
        for (let i = 0; i <= 7; i++) {
            grid.push(
                <DaytimeGrid date={mainDate} key={"dgr" + i} iterator={i}/>
            )
        }
        return grid;
    }

    const showWeekDays = () => {
        const weekDays = [];
        for (let i = 0; i <= 6; i++) {
            const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const year = mainDate.getFullYear();
            const currentMonth = mainDate.getMonth();
            const firstDay = (mainDate.getDate() - mainDate.getDay()) + i;
            const currentDate = new Date(year, currentMonth, firstDay);
            const isToday = Date.parse(currentDate) === Date.parse(new Date());
            weekDays.push(
                <WeekDays
                key={"wv"+i}
                date={currentDate}
                day={dayNames[i]}
                today={isToday}
                />
            )
        }
        return weekDays;
    }

    const navBorderDiv = () => {
        const borders = [];
        for (let i = 0; i <= 6; i++) {
            borders.push(
                <div key={"b" + i} className="nav-border-div"></div>
            )
        }
        return borders;
    }

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
        exit={"exit"}
        >
            <div className="week-nav">
                <div></div>
                <div className="nav-grid">
                    <div className="gmt">GMT+01</div>
                    {showWeekDays()}
                    {navBorderDiv()}
                </div>
            </div>
            <motion.div 
            className="week-cal-body"
            onScroll={{borderTop : "1px solid black"}}>
                <div className="time-frames">{showTimeFrames()}</div>
                <div className="week-cal-grid">
                    {showWeekGrid()}
                </div>
            </motion.div>
        </motion.div>
    )
}