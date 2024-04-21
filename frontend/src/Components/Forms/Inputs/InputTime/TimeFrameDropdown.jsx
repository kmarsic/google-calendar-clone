import { motion } from 'framer-motion';
import { useContext } from 'react';
import { EventChangeContext } from '../../formContext';

export function TimeFrameDropdown({times, setVisible, time}) {
    const dispatchReducer = useContext(EventChangeContext);
    return (
        <motion.ul 
        className="dropdown timeframe-dropdown"
        style={{originX:0 , originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {times.map((option, index) => 
            <li key={index} onClick={(e) => {dispatchReducer({type: time, payload: option});setVisible(false) }}>{option}</li>
            )}
        </motion.ul>
    )
}