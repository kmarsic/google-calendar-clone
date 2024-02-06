/* eslint-disable react/prop-types */
export function InputLocation({formData, handleInputChange}) {
    return (
        <div className="input-shell">
                <input
                    className="text-input"
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="Location"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e)}
                />
        </div>
    )
}