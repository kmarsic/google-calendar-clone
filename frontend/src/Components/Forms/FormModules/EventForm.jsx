/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faComment, faCalendarXmark, faCaretDown, faBriefcase, faBell} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { PlaceholderLocation, PlaceholderTime,InputDescription, InputUsername } from "../Inputs/indexInputs";

export function EventForm({ formData, handleInputChange, handleColor, color }) {
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
        });
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
            <PlaceholderTime 
            formData={formData} 
            handleFormFields={handleFormFields} 
            activeFormField={activeFormField} 
            handleInputChange={handleInputChange}/>
            <div className="icons">
                <FontAwesomeIcon icon={faLocationDot} color="var(--text-body)" size="xl"/>
            </div>
            <PlaceholderLocation 
            formData={formData} 
            handleFormFields={handleFormFields} 
            activeFormField={activeFormField} 
            handleInputChange={handleInputChange}/>
            <div className="icons">
                <FontAwesomeIcon icon={faComment} color="var(--text-body)" size="xl"/>
            </div>
            <InputDescription formData={formData} handleInputChange={handleInputChange}/>
            <div className="icons">
                <FontAwesomeIcon icon={faCalendarXmark} color="var(--text-body)" size="xl"/>
            </div>
            <InputUsername 
                isColorVisible={isColorVisible} 
                color={color} 
                handleColor={handleColor} 
                handleButtonClick={handleButtonClick} 
                handleInputChange={handleInputChange}
                colorRef={colorRef}
                style={{width : "12px"}}
            />
            <div className="icons">
                <FontAwesomeIcon icon={faBriefcase} color="var(--text-body" size="xl"
                />
            </div>
            <div className="dropdown-input">
                    <span className="text-input">Busy</span>
                    <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" size="sm" style={{ cursor: "pointer" }}
                    />
            </div>
            <div className="icons">
                <FontAwesomeIcon icon={faBell} color="var(--text-body" size="xl"
                />
            </div>
            <div className="dropdown-input">
                <span className="text-input">30 mins before</span>
                    <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" size="sm" style={{ cursor: "pointer" }}
                    />
            </div>
        </>
    )
}
