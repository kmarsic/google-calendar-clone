/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { currentDate } from "../../../redux/features/dateSlicer";
import { DaytimeGrid } from "../DaytimeGrid";
import { WeekDays } from "../week/WeekDays";
export function DayView() {
    const mainDate = new Date(useSelector(currentDate));
    const day = mainDate.getDay();
    console.log(day)
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
        <div className="week-view">
            <div className="week-nav">
                <div></div>
                <div className="nav-grid-day">
                    <div className="gmt">GMT+01</div>
                    <div>
                        <WeekDays day={dayNames[day]} date={mainDate}/>
                        <div className="nav-border-div"></div>
                    </div>
                    
                </div>
            </div>
            <div className="week-cal-body">
                <div className="time-frames">{showTimeFrames()}</div>
                <div className="day-cal-grid">
                    <DaytimeGrid iterator={0}/>
                    <DaytimeGrid iterator={0} day={true}/>
                </div>
            </div>
        </div>
    )
}