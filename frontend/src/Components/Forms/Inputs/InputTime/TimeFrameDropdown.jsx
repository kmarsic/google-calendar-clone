import { motion } from 'framer-motion';
import { useContext } from 'react';
import { EventChangeContext, EventDataContext } from '../../formContext';
import { hourTimeFormat } from '../../../../Fncs/Form/timeFormat';

export function TimeFrameDropdown({times, setVisible, time}) {
    const dispatchReducer = useContext(EventChangeContext);
    const formData = useContext(EventDataContext);
    const duration = formData.endTime - formData.startTime;
    console.log(duration)

    const mappedTimes = times.map((option, index) => 
    <li key={index} onClick={(e) => {dispatchReducer({type: time, payload: option});setVisible(false) }}>{hourTimeFormat(option)}</li>)

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