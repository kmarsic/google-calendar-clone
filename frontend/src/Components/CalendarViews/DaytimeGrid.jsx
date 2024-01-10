/* eslint-disable react/prop-types */
export function DaytimeGrid({iterator, date}) {
    const parsedDate = Date.parse(date);
    const hours = (date) => {
        const newDate = new Date(date)
        const hourGrid = [];
        for (let i = 0; i < 60; i+= 15) {
            newDate.setMinutes(i);
            newDate.setSeconds(0);
            hourGrid.push(
                <div className="hours" id={Date.parse(newDate)}></div>
            )
        }
        return hourGrid
    }
    const dayGrid = () => {
        const grid = [];
        for (let i = 0; i < 24; i++) {
            const newDate = new Date(parsedDate)
            newDate.setHours(i);
            grid.push(
                <div key={"ts" + i} id={Date.parse(newDate)} className={iterator == 0 ? "hairline-border" : "time-slot"}>
                        {hours(newDate)}
                </div>
            )
        }

        return grid;
    }
    
    return (
        <div className={iterator == 0 ? "hairline" : "week-column"}>
        {dayGrid()}
        </div>
    )
}