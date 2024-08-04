/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { ColorForm } from "../ColorForm"
import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { formData } from "../../../redux/features/formSlicer"

export function InputUsername() {
    const form = useSelector(formData);
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
                            style={{ backgroundColor: form.color }}
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