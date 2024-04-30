import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion';

export function ViewDropdown () {
    return (
    <motion.ul
        style={{x: "-172px", y: "110px", originX:"250px", originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        className="view-dropdown"
        >
                        <li>
                            <Link to={"/Day"}>
                                <div>Day</div>
                                <div>D</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/Week"}>
                                <div>Week</div>
                                <div>W</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/Month"}>
                                <div>Month</div>
                                <div>M</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/Year"}>
                                <div>Year</div>
                                <div>Y</div>
                            </Link>
                        </li>
        </motion.ul>

    )
}