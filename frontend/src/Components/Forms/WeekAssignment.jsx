import { useSelector } from "react-redux";
import { allTasks } from "../../redux/features/taskSlicer";
import { motion } from "framer-motion";
import { hourTimeFormat } from "../../Fncs/indexFncs";

export function WeekAssignment({date}) {
    const assignments = useSelector(allTasks);

    function mapAssignments(list) {
        const filtered = list.filter((task) => {
            return task.startDate == date
        })
        const mapped = filtered.map((task, index) => {
            return <Task key={index} task={task}/>
        })
        return mapped
    }

    return (
        <>
        {mapAssignments(assignments)}
        </>
    )
}

function Task({task}) {

    const startTime = task.startTime;
    const endTime = task.endTime
    const pixels = timePosition(startTime);
    const height = determineHeight(startTime, endTime);
    return (
        <motion.div 
        className='week-assignment' 
        style={{backgroundColor: task.color, top: pixels, height: height}}
        >
                <span>{task.title}</span>
                <span>{hourTimeFormat(new Date(startTime))} - {hourTimeFormat(new Date(endTime))}</span>
        </motion.div>
    )
}

function stackingContext( list ) {
    const timeline = 0;
    return timeline
}

function timePosition( startTime ) {
    const time = new Date(startTime);
    const hours = time.getHours();
    const minutes = time.getMinutes() / 60;
    const pixels = (hours * 48) + (minutes * 48) + 2;
    return pixels
}

function determineHeight( startTime, endTime) {
    const difference = (endTime - startTime) / 60000 / 15;
    console.log(difference)
    const height = 10 * difference + difference * 2 - 2;
    return height;
}