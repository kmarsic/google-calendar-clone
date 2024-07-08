import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currentDayOccurrence } from "../../../../../../Fncs/indexFncs";
import { EventDataContext } from "../../../../formContext";
import { useContext, useEffect, useRef, useState } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { ChangeRepeatDataContext, RepeatDataContext } from "../RepeatModal";

export function RepeatMonthly() {
    const formData = useContext(EventDataContext);
    const weekDay = new Date(formData.startDate).toLocaleDateString(undefined, {weekday: "long"});
    const repeatOptions = [`Monthly on day ${new Date(formData.startDate).getDate()}`, `Monthly on the ${currentDayOccurrence(formData)} ${weekDay}`]

    const [dropdown, setDropdown] = useState(false);

    const dropdownRef = useRef(null);
    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);


    const dataContext = useContext(RepeatDataContext);
    const setContext = useContext(ChangeRepeatDataContext);

    const handleClick = (option) => {
        setContext({type: "repeatOn", payload: option});
        setDropdown(false);
    }

    return (
        <div className="div-flex" style={{marginBottom: 20}}>
        <div
        className="repeat-option"
        onClick={() => setDropdown(!dropdown)}
        ref={dropdownRef}
        >
            <div className="div-flex padding" style={{gap: "1rem"}}>
                <span>{dataContext.repeatOn}</span>
                {dropdown ? 
                    <FontAwesomeIcon icon={faCaretDown}/> :
                    <FontAwesomeIcon icon={faCaretUp}/>}
            </div>
        </div>
        {dropdown ? 
            <motion.ul 
                className="dropdown notification-dropdown"
                style={{originX: "left", width: 250, top: 145, left: 24}}
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.1}}
                exit={{opacity: 0}}
                >
                    {repeatOptions.map((option, index) => 
                        <li key={index} onClick={() => {handleClick(option)}} >{option}</li>
                    )}
            </motion.ul>
        : null}
        </div>
    )
}