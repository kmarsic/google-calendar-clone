import { useEffect} from "react";
import { WeekTask } from "../Assignments/WeekTask";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { allTasks } from "../../redux/features/taskSlicer";

/* eslint-disable react/prop-types */
export function DaytimeGrid({ date }) {
    const parsedDate = Date.parse(date);
    const assignments = useSelector(allTasks);

    const {rect, isOver, node, over, setNodeRef} = useDroppable({
        id: parsedDate
    })

    const style = {
        backgroundColor: isOver ? 'rgba(174, 203, 250,0.2)' : undefined
    }

    function mapAssignments(list) {
        const newList = list
            .filter(task => task.startDate === parsedDate)
            .map((task, index) => <WeekTask key={index} task={task} />);
        
        return newList
    }
    
    return (
        <div ref={setNodeRef} className="week-column" style={style}>
            <DrawGrid parsedDate={parsedDate}/>
            <>{mapAssignments(assignments)}</>
        </div>
    );
}

export function DrawGrid({parsedDate}) {

    useEffect(() => {
            drawHorizontalLines(parsedDate);
    } ,[])

    function drawHorizontalLines(canvasId) {
        const canvas = document.getElementById(canvasId)
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 0.1;
        for (let i = 0; i < 1152; i += 48) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
    }

    return (
        <canvas className="canvas" id={parsedDate} height={1152}></canvas>
    )
}