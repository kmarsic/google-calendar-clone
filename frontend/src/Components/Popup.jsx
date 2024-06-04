import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export function Popup({notification}) {
    return createPortal(
        <motion.div 
        className="div-flex popup"
        style={{originX: 0, originY:0}}
        >
            <div>09:00AM No Title</div>
            <div>Notify me again in 5 minutes</div>
            <FontAwesomeIcon icon={faXmark} color="var(--text-body)" className="btn-round"/>
        </motion.div>, document.body
    )
}