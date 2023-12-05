/* eslint-disable react/prop-types */
export function WeekDays({date,day}) {
    return (
        <div className="week-day">
            <div className="week-day-name">{day}</div>
            <div>
                <span className="week-day-index">{date.getDate()}</span>
            </div>
        </div>
    )
}