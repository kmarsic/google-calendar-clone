import { useContext } from "react";
import { EventDataContext } from "../../formContext";
import { motion } from 'framer-motion';

export function RepeatDropdown({ repeat, setRepeat, setDropdown, container }) {
    const formData = useContext(EventDataContext);
    const weekDay = new Date(formData.startDate).toLocaleDateString(undefined, {weekday: "long"});
    const dayCount = () => {
        const dayIndex = new Date(formData.startDate).getDay();
        const day = new Date(formData.startDate).getDate();
        const year = new Date(formData.startDate).getFullYear();
        const month = new Date(formData.startDate).getMonth();
        const monthDays = new Date(year, month + 1, 0).getDate();

        const orderedNumbers = ["first", "second", "third", "fourth", "fifth"]
        let count = 0;

        for (let i = 0; i < monthDays; i++) {
            const iteration = new Date(year, month, i);
            if (iteration.getDay() === dayIndex) {
                count++;
                if (iteration.getDate() === day) break;
            }
        }
        return orderedNumbers[count - 1];
    }
    const repeatOptions = ["Does not repeat", "Daily", `Weekly on ${weekDay}`, `Monthly on the ${dayCount()} ${weekDay}`, `Annually on ${weekDay}`, "Every weekday (Monday to Friday)", "Custom..."]
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
            <li key={index} onClick={(e) => {setRepeat(option);setDropdown(e) }}  className={repeat === option ? "dropdown-highlight" : null}>{option}</li>
            )}
        </motion.ul>
    )
}