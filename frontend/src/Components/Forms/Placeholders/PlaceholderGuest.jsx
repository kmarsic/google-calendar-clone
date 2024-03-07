/* eslint-disable react/prop-types */
import { InputGuests } from "../Inputs/InputGuests";


export function PlaceholderGuest({handleFormFields, activeFormField}) {
    return (
    activeFormField.guests == "input" ? <InputGuests/> :
    <div className="input-shell">
            <div className="div-flex">
                <span className="text-input-placeholder" data-name="guests" onClick={(e) => handleFormFields(e)}>
                    Add <span className="placeholder-hover" data-name="guests" onClick={(e) => handleFormFields(e)}>guests</span>
                </span>
            </div>
    </div>
    )
}