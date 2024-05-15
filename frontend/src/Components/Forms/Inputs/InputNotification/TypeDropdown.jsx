import { useContext } from "react";
import { NotificationChangeContext } from "../../formContext";
import { motion } from 'framer-motion';

export function TypeDropdown( { setVisible, variable, list } ) {
    const dispatchReducer = useContext(NotificationChangeContext);

    return (
        <motion.ul 
        className="dropdown notification-dropdown"
        style={{originX:0 , originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {list.map((option, index) => <li key={index} onClick={() => {dispatchReducer({type: variable, payload: option}); setVisible(false)}}> {option} </li>)}
        </motion.ul>
    )
}