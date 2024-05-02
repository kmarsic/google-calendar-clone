import { useEffect, useRef } from "react";
import { Assignment } from './../Forms/Assignment'

/* eslint-disable react/prop-types */
export function DaytimeGrid({ date }) {
    const parsedDate = Date.parse(date);
    const columnRef = useRef(null);
    
    return (
        <>
        <div className="week-column" ref={columnRef}>
            <DrawGrid parsedDate={parsedDate}/>
        </div>
        </>
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
        <canvas className="canvas" id={parsedDate} height={1152}>
            <Assignment date={parsedDate}/>
        </canvas>
    )
}