/* eslint-disable react/prop-types */

import { InputTime } from "./InputTime";

export function PlaceholderTime({handleFormFields, activeFormField, formData, handleInputChange}) {
    return (
        activeFormField.time == "input" ? <InputTime handleInputChange={handleInputChange} formData={formData}/> :
        <div className="input-shell">
                <div className="form-time">
                    <div className="div-flex">
                        <div className="text-input-placeholder" data-name="time" onClick={(e) => handleFormFields(e)}>{formData.startTime}</div>
                        <span>&#8212;</span>
                        <div className="text-input-placeholder" data-name="time" onClick={(e) => handleFormFields(e)}>{formData.endTime}</div>
                        <button className="btn" onClick={(e) => e.preventDefault()}>Add time</button>
                    </div>
                </div>
            </div>
    )
}