import { useState } from "react"

export function RepeatOn() {
    const [days, setDays] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: true,
        Thursday: false,
        Friday: false,
        Saturday: false
    })
    return (
        <div>
            <p style={{marginBottom: 12}}>Repeat on</p>
            <div className="div-flex" style={{gap: 6, marginBottom: 20}}>
                <div className={days.Sunday ? "btn-small btn-focus" : "btn-small btn-gray"}>S</div>
                <div className={days.Monday ? "btn-small btn-focus" : "btn-small btn-gray"}>M</div>
                <div className={days.Tuesday ? "btn-small btn-focus" : "btn-small btn-gray"}>T</div>
                <div className={days.Wednesday ? "btn-small btn-focus" : "btn-small btn-gray"}>W</div>
                <div className={days.Thursday ? "btn-small btn-focus" : "btn-small btn-gray"}>T</div>
                <div className={days.Friday ? "btn-small btn-focus" : "btn-small btn-gray"}>F</div>
                <div className={days.Saturday ? "btn-small btn-focus" : "btn-small btn-gray"}>S</div>
            </div>
        </div>
    )
}