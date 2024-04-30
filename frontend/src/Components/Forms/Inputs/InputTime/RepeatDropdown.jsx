import { useContext } from "react";
import { EventDataContext } from "../../formContext";
import { motion } from 'framer-motion';

export function RepeatDropdown({ repeat, setRepeat, setDropdown }) {
    const formData = useContext(EventDataContext);
    const day = new Date(formData.startDate).toLocaleDateString(undefined, {weekday: "long"});
    const repeatOptions = ["Does not repeat", "Daily", `Weekly on ${day}`, `Monthly on the second ${day}`, `Annually on ${day}`, "Every weekday (Monday to Friday)", "Custom..."]
    return (
        <motion.ul 
        className="dropdown repeat-dropdown"
        style={{originX:0 , originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {repeatOptions.map((option, index) => 
            <li key={index} onClick={(e) => {setRepeat(option);setDropdown(e) }}  className={repeat === option ? "repeat-highlight" : null}>{option}</li>
            )}
        </motion.ul>
    )
}