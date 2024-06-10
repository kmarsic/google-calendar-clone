import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export function Popup({notification, setVisible}) {
    function duplicateNotification() {
        //read the passed notification
        //duplicate it in state or database
    }
    return createPortal(
        <motion.div 
        className="div-flex popup"
        initial={{bottom: "-50px"}}
        animate={{bottom: 0}}
        style={{originX: 0, originY:0}}
        exit={{bottom: "-50px"}}
        >
            <div>09:00AM No Title</div>
            <div onClick={() => "x"}>Notify me again in 5 minutes</div>
            <FontAwesomeIcon icon={faXmark} color="var(--text-body)" className="btn-round" onClick={() => setVisible(false)}/>
        </motion.div>, document.body
    )
}