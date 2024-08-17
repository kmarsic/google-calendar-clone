import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { currentDate, setView, switchView } from "../../../redux/features/dateSlicer";
import { WeekDays } from "./WeekDays";
import { DaytimeGrid } from "../DaytimeGrid";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";
import { TimeLegend} from "../TimeLegend";
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { modifyTask } from "../../../redux/features/taskSlicer";
import { WeekTask } from "../../Assignments/WeekTask";
import {createSnapModifier, restrictToFirstScrollableAncestor, restrictToParentElement, restrictToVerticalAxis, restrictToWindowEdges} from "@dnd-kit/modifiers"

export function WeekView() {
    const mainDate = new Date(useSelector(currentDate));
    const switches = useSelector(switchView);
    const dispatch = useDispatch();

    const [navBorder, setNavBorder] = useState(false);
    const [activeDrag, setActiveDrag] = useState(null);

    const gridRef = useRef(null);

    const showWeekGrid = () => {
        const grid = [];
        for (let i = 0; i <= 6; i++) {
            const newDate = new Date(mainDate.getFullYear(), mainDate.getMonth(), mainDate.getDate() - mainDate.getDay() + i);
            grid.push(
                <DaytimeGrid date={newDate} key={"dgr" + i} />
            );
        }
        return grid;
    };

    const showWeekDays = () => {
        const weekDays = [];
        for (let i = 0; i <= 6; i++) {
            const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const year = mainDate.getFullYear();
            const currentMonth = mainDate.getMonth();
            const firstDay = mainDate.getDate() - mainDate.getDay() + i;
            const currentDate = new Date(year, currentMonth, firstDay);
            const isToday = Date.parse(currentDate) === Date.parse(new Date());
            weekDays.push(
                <WeekDays
                    key={"wv" + i}
                    date={currentDate}
                    day={dayNames[i]}
                    today={isToday}
                />
            );
        }
        return weekDays;
    };

    const navBorderDiv = () => {
        const borders = [];
        for (let i = 0; i <= 6; i++) {
            borders.push(<div key={"b" + i} className="nav-border-div"></div>);
        }
        return borders;
    };

    const handleScroll = (e) => {
        if (e.target.scrollTop == 0) {
            setNavBorder(false);
        } else setNavBorder(true);
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        console.log(active,over, event)
        dispatch(modifyTask({
            type: "startDate",
            uuid: active.id,
            payload: over.id
        }))
        setActiveDrag(null);
    }

    function handleDragStart(event) {
        console.log(event)
        setActiveDrag(event.active.data.current)
    }

    const gridSize = 15;
    const snapToGridModifier = createSnapModifier(gridSize)

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} modifiers={[restrictToVerticalAxis, snapToGridModifier]} >
            <DragOverlay adjustScale={false} dropAnimation={null}>
                <WeekTask task={activeDrag}/>
            </DragOverlay>
            <motion.div
            className="week-view"
            key={mainDate}
            variants={calendarVariant}
            initial={switches == "prev" ? "hidden" : "hiddenNext"}
            animate={"visible"}
            exit={"exit"}
            >
                <div className={navBorder ? "week-nav-border" : "week-nav"}>
                    <div></div>
                    <div className="nav-grid">
                        <div className="gmt">GMT+01</div>
                        {showWeekDays()}
                        {navBorderDiv()}
                    </div>
                </div>
                <motion.div className="week-cal-body" onScroll={(e) => handleScroll(e)}>
                    <div className="time-frames"><TimeLegend/></div>
                    <div className="week-cal-grid" ref={gridRef}>
                        <div className="hairline"></div>
                        {showWeekGrid()}
                    </div>
                </motion.div>
            </motion.div>
        </DndContext>
    );
}
