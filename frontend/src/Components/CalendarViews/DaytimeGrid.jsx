/* eslint-disable react/prop-types */
export function DaytimeGrid({iterator}) {
    const dayGrid = () => {
        const grid = [];
        for (let i = 0; i < 24; i++) {
            
            grid.push(
                <div key={"ts" + i} className={iterator == 0 ? "hairline-border" : "time-slot"}></div>
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