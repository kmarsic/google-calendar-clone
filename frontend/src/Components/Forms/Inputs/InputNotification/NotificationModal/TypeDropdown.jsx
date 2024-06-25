import { motion } from 'framer-motion';

export function TypeDropdown( { setVisible, variable, list, setState } ) {
    return (
        <motion.ul 
        className="dropdown notification-dropdown"
        style={{originX:0 , originY: 0, top: "35px"}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {list.map((option, index) => <li key={index} onClick={() => { setState({type: variable, payload: option}); setVisible(false); setState({type: "error"})}}> {option} </li>)}
        </motion.ul>
    )
}