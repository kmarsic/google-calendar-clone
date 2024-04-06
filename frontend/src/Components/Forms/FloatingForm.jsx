import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { FormDropdown } from "./FormDropdown";
import { createPortal } from "react-dom";

export function FloatingForm({ burger, handleClick }) {
    const [visible, setVisible] = useState(false);
    console.log(handleClick)
    return (
        <>
        <div className="floating-form" onClick={() => setVisible(true)}>
            <div>
                <svg width="36" height="36" viewBox="0 0 36 36">
                    <path fill="#34A853" d="M16 16v14h4V20z"></path>
                    <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                    <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                    <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                </svg>
            </div>
            {burger ? 
            <>
                <div className="float-form-flex">
                    <span style={{fontSize: "14px", fontWeight: "500", letterSpacing: "0.25px"}}>Create</span>
                </div>
                <div className="float-form-flex">
                    <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>
                </div>
            </>
            : null}
        </div>
        <FormDropdown handleClick={handleClick} isOpen={visible} onClose={() => setVisible(null)}/>
        </>
    )
}