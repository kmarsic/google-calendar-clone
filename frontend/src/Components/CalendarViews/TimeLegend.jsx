export const TimeLegend = () => {
    const times = [];
    for (let i = 1; i <= 12; i++) {
        times.push(
            <div key={"ta" + i} className="time-frame">
                <span className="time">{i} {i == 12 ? "PM" : "AM"}</span>
            </div>
        );
    }
    for (let i = 1; i <= 11; i++) {
        times.push(
            <div key={"tp" + i} className="time-frame">
                <span className="time">{i} PM</span>
            </div>
        );
    }
    return times;
};