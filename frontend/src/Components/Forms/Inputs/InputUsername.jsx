/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { ColorForm } from "../ColorForm"
import { useContext, useRef, useState, useEffect } from "react"
import { EventDataContext } from "../formContext"

export function InputUsername() {
    const [isColorVisible, setIsColorVisible] = useState(false);
    const dropdownRef = useRef(null)

    const handleButtonClick = () => {
        setIsColorVisible(!isColorVisible);
    };
    const handleClickOutside = (e) => {
        if (e.target.name !== "color" || dropdownRef.current.contains(e.target)) {
            setIsColorVisible(false)
          }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const formData = useContext(EventDataContext);
    return(
        <div className="form-username">
                <span className="text-input-grow0" >Username</span>
                <div
                    ref={dropdownRef}
                    className="color"
                    onClick={() => handleButtonClick()}
                    style={{ cursor: "pointer" }}
                >
                        <div
                            className="color-switch"
                            style={{ backgroundColor: formData.color }}
                        >
                            {isColorVisible ? (
                                <ColorForm
                                container={dropdownRef}/>
                            ) : null}
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" size="sm" style={{ cursor: "pointer" }}/>
                </div>
        </div>
    )
}