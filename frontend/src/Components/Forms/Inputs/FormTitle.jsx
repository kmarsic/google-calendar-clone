/* eslint-disable react/prop-types */
export function FormTitle ({formData, handleInputChange}) {
    return (
        <input
            type="text"
            id="form-title"
            name="title"
            autoFocus
            required
            placeholder="Add title"
            value={formData.title}
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
        />
    )
}