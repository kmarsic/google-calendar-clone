import { InputLocation } from "../Inputs/InputLocation"

/* eslint-disable react/prop-types */
export function PlaceholderLocation({handleFormFields, activeFormField}) {
    return (
    activeFormField.location == "input" ? <InputLocation/> :
    <div className="input-shell">
            <div className="div-flex">
                <span className="text-input-placeholder" data-name="location" onClick={(e) => handleFormFields(e)}>
                    <span className="placeholder-hover" data-name="location" onClick={(e) => handleFormFields(e)}>Location</span>
                </span>
            </div>
    </div>
    )
}