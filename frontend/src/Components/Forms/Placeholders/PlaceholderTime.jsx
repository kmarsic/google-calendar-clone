/* eslint-disable react/prop-types */

import { InputTimeStart, InputTimeEnd } from "../Inputs/InputTime";

export function PlaceholderTime({handleFormFields, activeFormField, formData, handleInputChange}) {
    return (
        <div className="input-shell">
                <div>
                    <div className="div-flex">
                        {activeFormField.startTime == "input" ? <InputTimeStart handleInputChange={handleInputChange} formData={formData}/> :
                        <span className="text-input-placeholder" data-name="startTime" style={{width: formData.startTime.length + "ch"}}
                        onClick={(e) => handleFormFields(e)}>
                            {formData.startTime}
                        </span>}

                        <span>&#8212;</span>

                        {activeFormField.endTime == "input" ? <InputTimeEnd handleInputChange={handleInputChange} formData={formData}/> :
                        <span 
                        className="text-input-placeholder"
                        data-name="endTime"
                        style={{width: formData.startTime.length + "ch"}}
                        onClick={(e) => handleFormFields(e)}>
                            {formData.endTime}
                        </span>}
                        <button className="btn" 
                        onClick={(e) => e.preventDefault()}>Add time</button>
                    </div>
                </div>
            </div>
    )
}