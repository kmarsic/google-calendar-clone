import { motion } from 'framer-motion';
import { hourTimeFormat } from '../../../../Fncs/Form/timeFormat';

export function TimeFrameDropdown({times, setVisible, time, reducer}) {

    const mappedTimes = times.map((option, index) => 
    <li key={index} onClick={() => {reducer(time, Date.parse(option));setVisible(false)}}>{hourTimeFormat(option)}</li>)

    return (
        <motion.ul 
        className="dropdown timeframe-dropdown"
        style={{originX:0 , originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {mappedTimes}
        </motion.ul>
    )
}