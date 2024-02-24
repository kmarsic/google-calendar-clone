/* eslint-disable react/prop-types */
import { InputDescription } from "../Inputs/InputDescription";

export function PlaceholderDescription({handleFormFields, activeFormField, formData, handleInputChange}) {
    return (
    activeFormField.description == "input" ? <InputDescription formData={formData} handleInputChange={handleInputChange} /> :
    <div className="input-shell">
            <div className="div-flex">
                <span className="text-input" data-name="description" onClick={(e) => handleFormFields(e)}>Add description or attachments</span>
            </div>
    </div>
    )
}