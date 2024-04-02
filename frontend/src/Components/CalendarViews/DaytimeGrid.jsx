/* eslint-disable react/prop-types */
export function DaytimeGrid({ iterator, date }) {
    const hairlineGrid = () => {
        const hairlinesGrid = [];
        for (let i = 0; i < 24; i++) {
            hairlinesGrid.push(
                <div
                    key={"hg" + i}
                    className="hairline-border" 
                >
                </div>
            );
        }
        return hairlinesGrid
    }
    
    const dayGrid = () => {
        const daysGrid = [];
        for (let i = 0; i < 24; i++) {
            const newDate = new Date(date);
            newDate.setHours(i);
            daysGrid.push(
                <div
                    key={"ts" + i}
                    id={Date.parse(newDate)}
                    className="time-slot"
                >
                </div>
            );
        }

        return daysGrid;
    };

    return (
        <>
        {iterator == 0 ? <div className="hairline"> {hairlineGrid()}</div> : null}
        <div className="week-column">
            {iterator == 7 ? null : dayGrid()}
        </div>
        </>
    );
}