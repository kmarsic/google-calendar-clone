export function DaytimeGrid() {
    const dayGrid = () => {
        const grid = [];
        for (let i = 0; i < 24; i++) {
            grid.push(
                <div className="time-slot"></div>
            )
        }

        return grid;
    }
    return (
        <>
        {dayGrid()}
        </>
    )
}