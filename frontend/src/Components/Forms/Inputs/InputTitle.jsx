/* eslint-disable react/prop-types */
export function InputTitle ({formData, handleInputChange}) {
    return (
        <span className="bottom-border-animate form-title">
            <input
                type="text"
                name="title"
                autoFocus
                required
                placeholder="Add title and time"
                value={formData.title}
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
            />
        </span>
    )
}