/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { ColorForm } from "../ColorForm"
import { useContext } from "react"
import { FormDataContext } from "../formContext"

export function InputUsername({isColorVisible, handleButtonClick, colorRef}) {
    const formData = useContext(FormDataContext);
    return(
        <div className="form-username">
                <span className="text-input-grow0" >Username</span>
                <div
                    className="color"
                    onClick={() => handleButtonClick()}
                    style={{ cursor: "pointer" }}
                >
                        <div
                            className="color-switch"
                            ref={colorRef}
                            style={{ backgroundColor: formData.color }}
                        >
                            {isColorVisible ? (
                                <ColorForm/>
                            ) : null}
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" size="sm" style={{ cursor: "pointer" }}/>
                </div>
        </div>
    )
}