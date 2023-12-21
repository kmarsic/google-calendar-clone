/* eslint-disable react/prop-types */
export function ColorForm ({setColor, handleInputChange}) {
    const COLORS = {
        tomato : "#d50000",
        flamingo : "#e67c73",
        tangerine : "#f4511e",
        banana : "#f6bf26",
        sage : "#33b679",
        basil : "#33b679",
        peacock: "#039be5",
        blueberry : "#3f51b5",
        grape : "#7986cb",
        lavender : "#8e24aa",
        graphite : "#616161",
    }

    function handleColor(e) {
        setColor(e);
    }

    return (
        <div className="color-form">
            {Object.entries(COLORS).map(([colorName, colorValue]) => (
                <div key={colorName}>
                    <input
                        type="checkbox"
                        name="color"
                        onClick={(e) => handleColor(e)}
                        onChange={(e) => {handleColor(e); handleInputChange(e) }}
                        value={colorValue}
                        id={colorName}
                        style={{ backgroundColor: colorValue }}
                    />
                </div>
            ))}
        </div>
    )
}