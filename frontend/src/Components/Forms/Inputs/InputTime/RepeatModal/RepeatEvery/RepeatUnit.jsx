import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ChangeRepeatDataContext, RepeatDataContext } from "../RepeatModal";

export function RepeatUnit({}) {
    const [visible, setVisible] = useState(false);
    const dataContext = useContext(RepeatDataContext);
    const setDataContext = useContext(ChangeRepeatDataContext)

    const handleClick = (option) => {
        setDataContext({type: "unit", payload: option})
        setVisible(false)
    }

    const dropdownRef = useRef(null);
    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const list = ["days", "weeks", "months", "years"]
    return(
        <>
        <div ref={dropdownRef} className="repeat-option">
            <div className="div-flex padding" style={{gap: "1rem"}} onClick={() => setVisible(!visible)} >
                <div>
                    {dataContext.repeatInterval > 1 ? 
                        dataContext.unit : 
                        dataContext.unit.substring(0, dataContext.unit.length - 1)}
                </div>
                {visible ? <FontAwesomeIcon icon={faCaretUp} color="var(--text-body)"/> : <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>}
            </div>
            {visible ? 
            <motion.ul 
            className="dropdown notification-dropdown"
            style={{originX:0 , originY: 0, top: "35px"}}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.1}}
            exit={{opacity: 0}}
            >
                {list.map((option, index) => <li key={index} onClick={() => handleClick(option)}> {dataContext.repeatInterval > 1 ? option : option.substring(0, option.length - 1)} </li>)}
            </motion.ul> : null}
        </div>
        </>
    )
}