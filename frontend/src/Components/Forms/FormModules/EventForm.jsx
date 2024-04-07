/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faComment, faCalendarXmark, faBell, faUsers} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { PlaceholderLocation, PlaceholderTime, InputUsername } from "../Inputs/indexInputs";
import { PlaceholderDescription } from "../Placeholders/PlaceholderDescription";
import { PlaceholderGuest } from "../Placeholders/PlaceholderGuest";
import { PlaceholderNotification } from "../Placeholders/PlaceholderNotification";

export function EventForm() {
    const [isColorVisible, setIsColorVisible] = useState(false);
    
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
    const colorRef = useRef(null);

    const handleButtonClick = () => {
        setIsColorVisible(!isColorVisible);
    };
    const handleClickOutside = (e) => {
        if (colorRef.current && !colorRef.current.contains(e.target)) {
            setIsColorVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            <InputUsername isColorVisible={isColorVisible}  handleButtonClick={handleButtonClick} colorRef={colorRef}/>

            <div className="icons">
                <FontAwesomeIcon icon={faBell} color="var(--text-body" size="xl"/>
            </div>
            <PlaceholderNotification/>
        </>
    )
}
