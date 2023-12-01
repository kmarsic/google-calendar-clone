/* eslint-disable react/prop-types */
export function WeekDays({date,day}) {
    return (
        <div className="week-day">
            <div className="week-day-name">{day}</div>
            <div>
                <h2 className="week-day-index">{date.getDate()}</h2>
            </div>
            <div className="week-day-border-div"></div>
        </div>
    )
}