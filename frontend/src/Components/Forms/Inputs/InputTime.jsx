/* eslint-disable react/prop-types */

export function InputTimeStart({formData, handleInputChange}) {
    return (
        <span className="bottom-border-animate">
            <input
                className="text-input"
                autoFocus
                value={formData.startTime}
                style={{width: formData.startTime.length + "ch"}}
                name="startTime"
                onChange={(e) => handleInputChange(e)}>
            </input>
        </span>
    )
}

export function InputTimeEnd({formData, handleInputChange}) {
    return (
        <span className="bottom-border-animate">
            <input
                className="text-input"
                autoFocus
                value={formData.endTime}
                style={{width: formData.startTime.length + "ch"}}
                name="endTime"
                onChange={(e) => handleInputChange(e)}>
            </input>
        </span>
    )
}