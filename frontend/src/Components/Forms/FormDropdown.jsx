import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export function FormDropdown({ isOpen, onClose, handleClick }) {

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