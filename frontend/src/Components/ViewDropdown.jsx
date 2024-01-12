import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setView } from "../redux/features/dateSlicer";
import { motion } from 'framer-motion';

export function ViewDropdown () {
    const dispatch = useDispatch();

    return (
    <motion.div
        style={{x: "-172px", y: "15px", originX:"250px", originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            <ul  className="dropdown">
                    <motion.div>
                        <li onClick={() => dispatch(setView("Day"))}>
                            <Link to={"/Day"}>
                                <div>Day</div>
                                <div>D</div>
                            </Link>
                        </li>
                    </motion.div>
                    <motion.div>
                        <li onClick={() => dispatch(setView("Week"))}>
                            <Link to={"/Week"}>
                                <div>Week</div>
                                <div>W</div>
                            </Link>
                        </li>
                    </motion.div>
                    <motion.div>
                        <li onClick={() => dispatch(setView("Month"))}>
                            <Link to={"/Month"}>
                                <div>Month</div>
                                <div>M</div>
                            </Link>
                        </li>
                    </motion.div>
                    <motion.div>
                        <li onClick={() => dispatch(setView("Year"))}>
                            <Link to={"/Year"}>
                                <div>Year</div>
                                <div>Y</div>
                            </Link>
                        </li>
                    </motion.div>
            </ul>
        </motion.div>

    )
}