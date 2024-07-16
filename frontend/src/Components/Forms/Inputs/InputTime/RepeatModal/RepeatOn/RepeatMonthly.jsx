import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currentDayOccurrence } from "../../../../../../Fncs/indexFncs";
import { EventDataContext } from "../../../../formContext";
import { useContext, useEffect, useRef, useState } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { ChangeRepeatDataContext, RepeatDataContext } from "../InputRepeat";

export function RepeatMonthly() {
    const formData = useContext(EventDataContext);
    const weekDay = new Date(formData.startDate).toLocaleDateString(undefined, {weekday: "long"});
    const repeatOptions = [{
        type: "index",
        index: new Date(formData.startDate).getDate(),
        dateString: `Monthly on day ${new Date(formData.startDate).getDate()}`
        
    }, {
        type: "weekDayOccurence",
        weekDay: new Date(formData.startDate).getDay(),
        dateString: `Monthly on the ${currentDayOccurrence(formData)} ${weekDay}`
    }]

    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setDropdown(false) }

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);


    const dataContext = useContext(RepeatDataContext);
    const setContext = useContext(ChangeRepeatDataContext);

    const handleClick = (option) => {
        if (option.type === "index") {
            setContext({type: "updateRepeatOnDayIndex", payload: option.index});
            setContext({type: "updateRepeatOnWeekDayOccurence", payload: ""});
        } else if (option.type === "weekDayOccurence") {
            setContext({type: "updateRepeatOnWeekDayOccurence", payload: option.weekDay});
            setContext({type: "updateRepeatOnDayIndex", payload: ""});
        }
        setDropdown(false);
    }

    useEffect(() => {
        setContext({type: "updateRepeatOnDayIndex", payload: new Date(formData.startDate).getDate()})
    }, [])

    useEffect(() => {
        return () => {
            setContext({type: "updateRepeatOnDayIndex", payload: ""});
            setContext({type: "updateRepeatOnWeekDayOccurence", payload: ""});
        }
    }, [])

    const dropdownContent = () => {
        if (dataContext.repeatOnDayIndex === "") {
            return `Monthly on the ${currentDayOccurrence(formData)} ${weekDay}`
        } else if (dataContext.repeatOnWeekDayOccurence === "") {
            return `Monthly on day ${dataContext.repeatOnDayIndex}`
        }
    }

    return (
        <div className="div-flex" style={{marginBottom: 20}} ref={dropdownRef}>
        <div
        className="repeat-option"
        onClick={() => setDropdown(!dropdown)}
        >
            <div className="div-flex padding" style={{gap: "1rem"}}>
                <span>{dropdownContent()}</span>
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
                        <li key={index} onClick={() => {handleClick(option)}} >{option.dateString}</li>
                    )}
            </motion.ul>
        : null}
        </div>
    )
}