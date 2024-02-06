/* eslint-disable react/prop-types */
export function InputDescription({formData, handleInputChange}) {
    return (
        <div className="input-shell">
                <input
                    className="text-input"
                    type="text"
                    name="description"
                    placeholder="Add description or attachments"
                    autoComplete="off"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                />
        </div>
    )
}