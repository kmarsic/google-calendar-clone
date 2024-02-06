/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { ColorForm } from "../ColorForm"

export function InputUsername({isColorVisible, handleButtonClick, color, handleColor, handleInputChange, colorRef}) {
    return(
        <div className="form-username">
                <span className="text-input-placeholder" >Username</span>
                <div
                    className="color"
                    onClick={() => handleButtonClick()}
                    style={{ cursor: "pointer" }}
                >
                        <div
                            className="color-switch"
                            ref={colorRef}
                            style={{ backgroundColor: color }}
                        >
                            {isColorVisible ? (
                                <ColorForm
                                    setColor={handleColor}
                                    handleInputChange={handleInputChange}
                                    colors={color}
                                />
                            ) : null}
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" size="sm" style={{ cursor: "pointer" }}/>
                </div>
        </div>
    )
}