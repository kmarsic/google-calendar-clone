/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faLocationDot,
    faComment,
    faCalendarXmark,
    faCaretDown,
    faBriefcase,
    faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { ColorForm } from "./ColorForm";

export function EventForm({ formData, handleInputChange, color, handleColor }) {
    const colorRef = useRef(null);
    const [isColorVisible, setIsColorVisible] = useState(false);

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
                <FontAwesomeIcon
                    icon={faClock}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="input-shell">
                <input
                    type="text"
                    name="time"
                    autoComplete="off"
                    value={formData.startTime}
                    className="text-input"
                    onChange={(e) => handleInputChange(e)}
                ></input>
            </div>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faLocationDot}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="input-shell">
                <input
                    className="text-input"
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="Location"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e)}
                ></input>
            </div>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faComment}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="input-shell">
                <input
                    className="text-input"
                    type="text"
                    name="description"
                    placeholder="Add description or attachments"
                    autoComplete="off"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                ></input>
            </div>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faCalendarXmark}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="dropdown-input">
                    <span className="text-input" >Username</span>
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
                                />
                            ) : null}
                        </div>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            color="var(--text-body)"
                            size="sm"
                            style={{ cursor: "pointer" }}
                        />
                    </div>
            </div>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faBriefcase}
                    color="var(--text-body"
                    size="xl"
                />
            </div>
            <div className="dropdown-input">
                    <span className="text-input">Busy</span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        color="var(--text-body)"
                        size="sm"
                        style={{ cursor: "pointer" }}
                    />
            </div>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faBell}
                    color="var(--text-body"
                    size="xl"
                />
            </div>
            <div className="dropdown-input">
                <span className="text-input">30 mins before</span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        color="var(--text-body)"
                        size="sm"
                        style={{ cursor: "pointer" }}
                    />
            </div>
        </>
    );
}
