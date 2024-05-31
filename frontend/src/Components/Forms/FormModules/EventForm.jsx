/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faComment, faCalendarXmark, faBell, faUsers} from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";
import { PlaceholderLocation, PlaceholderTime, InputUsername } from "../Inputs/indexInputs";
import { PlaceholderDescription } from "../Placeholders/PlaceholderDescription";
import { PlaceholderGuest } from "../Placeholders/PlaceholderGuest";
import { InputNotification } from "../Inputs/InputNotification/InputNotification";

export function EventForm() {
    
    const [activeFormField, setActiveFormField] = useState({
        time: "placeholder",
        guest: "placeholder",
        location: "placeholder",
        description: "placeholder",
        user: "placeholder"
    })

    function handleFormFields(e) {
        setActiveFormField({
            ...activeFormField,
            [e.target.dataset.name] : "input"
        })
    }

    return (
        <>
            <div className="icons">
                <FontAwesomeIcon icon={faClock} color="var(--text-body)" size="xl"/>
            </div>
            <PlaceholderTime handleFormFields={handleFormFields} activeFormField={activeFormField} />

            <div className="icons">
                <FontAwesomeIcon icon={faUsers} color="var(--text-body)" size="xl"/>
            </div>
            <PlaceholderGuest handleFormFields={handleFormFields} activeFormField={activeFormField}/>

            <div className="icons">
                <FontAwesomeIcon icon={faLocationDot} color="var(--text-body)" size="xl"/>
            </div>
            <PlaceholderLocation  handleFormFields={handleFormFields} activeFormField={activeFormField} />

            <div className="icons">
                <FontAwesomeIcon icon={faComment} color="var(--text-body)" size="xl"/>
            </div>
            <PlaceholderDescription activeFormField={activeFormField} handleFormFields={handleFormFields}/>
            
            <div className="icons">
                <FontAwesomeIcon icon={faCalendarXmark} color="var(--text-body)" size="xl"/>
            </div>
            <InputUsername/>

            <div className="icons">
                <FontAwesomeIcon icon={faBell} color="var(--text-body" size="xl"/>
            </div>
            <InputNotification/>
        </>
    )
}
