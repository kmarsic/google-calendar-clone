import { InputLocation } from "../Inputs/InputLocation"

/* eslint-disable react/prop-types */
export function PlaceholderLocation({handleFormFields, activeFormField, formData, handleInputChange}) {
    return (
    activeFormField.location == "input" ? <InputLocation formData={formData} handleInputChange={handleInputChange} /> :
    <div className="input-shell">
            <div className="div-flex">
                <span className="text-input" data-name="location" onClick={(e) => handleFormFields(e)}>Location</span>
            </div>
    </div>
    )
}