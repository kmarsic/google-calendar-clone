/* eslint-disable react/prop-types */
import { InputDescription } from "../Inputs/InputDescription";

export function PlaceholderDescription({handleFormFields, activeFormField}) {
    return (
    activeFormField.description == "input" ? <InputDescription /> :
    <div className="input-shell">
            <div className="div-flex">
                <span className="text-input-placeholder" data-name="description" onClick={(e) => handleFormFields(e)}>
                    Add <span className="placeholder-hover" data-name="description" onClick={(e) => handleFormFields(e)}>description </span> 
                    or <span className="placeholder-hover" data-name="description" onClick={(e) => handleFormFields(e)}>attachments</span></span>
            </div>
    </div>
    )
}