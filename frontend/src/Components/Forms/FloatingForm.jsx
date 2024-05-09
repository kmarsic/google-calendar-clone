import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export function FloatingForm({ burger, handleClick }) {
    const [visible, setVisible] = useState(false);

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

function FormDropdown({ isOpen, onClose, handleClick }) {

    if (isOpen) {
        return (
        <motion.div
        className='form-dropdown'
        initial={{opacity: 0, scale: 0.8, top: "80px", left: "25px", originY: "100px", originX: 0}}
        animate={{opacity: 1, scale: 1, top: "145px", left: "25px"}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}>
            <ul>
                <li id='form-event' onClick={(e) => {handleClick(e); onClose()}}>Event</li>
                <li id='form-task' onClick={(e) => {handleClick(e); onClose()}}>Task</li>
            </ul>
            {createPortal(<div className='overlay' onClick={onClose}></div>, document.body)}
        </motion.div>
    )} else return null
}