import { useEffect, useRef, useState } from "react";
import { WeekAssignment } from "../Assignments/WeekAssignment";
import { useDroppable } from "@dnd-kit/core";

/* eslint-disable react/prop-types */
export function DaytimeGrid({ date }) {
    const parsedDate = Date.parse(date);
    
    const {isOver, setNodeRef} = useDroppable({
        id: parsedDate
    })

    const style = {
        backgroundColor: isOver ? 'rgba(174, 203, 250,0.2)' : undefined
    }
    
    return (
        <div ref={setNodeRef} className="week-column" style={style}>
            <DrawGrid parsedDate={parsedDate}/>
            <WeekAssignment date={parsedDate}/>
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