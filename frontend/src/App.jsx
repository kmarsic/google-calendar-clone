/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./styles/_index.scss";
// components
import { Navigation } from "./Components/Nav/Navigation";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { SiteRouter } from "./SiteRouter";
import { NewTaskForm } from "./Components/Forms/NewTaskForm";
import { TitleTab } from "./TitleTab";
import { FloatingForm } from "./Components/Forms/FloatingForm";
//deps
import { currentDate, setFocusDate } from "./redux/features/dateSlicer";
import getData from "./redux/features/thunk/getData";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
    const [burger, setBurgerOpen] = useState(false);
    const [clickedElement, setClickedElement] = useState(null);

    const date = useSelector(currentDate);
    const calendarRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
    }, []);
    

    const handleClick = (e) => {
        if (
            e.target.classList.contains("box") ||
            e.target.classList.contains("time-slot")
        ) {
            dispatch(setFocusDate(e.target.id));
            setClickedElement({
                id: e.target.id,
                data: e,
            });
            return;
        } else if (e.target.id === "form-event" || e.target.id === "form-task") {
            setClickedElement({
                id: date,
                data: e,
                type: e.target.id
            })
        }
    };
    useEffect(() => {
        document.body.addEventListener("click", handleClick);
    }, []);

    return (
        <>
            <TitleTab/>
            <Navigation burger={burger} setBurger={setBurgerOpen}/>
            <AnimatePresence>
                <div className="calendar-main" ref={calendarRef}>
                    <Sidebar burgerOpen={burger} />
                    <SiteRouter />
                </div>
            </AnimatePresence>
            <FloatingForm handleClick={handleClick} burger={burger} />
            {clickedElement &&(<AnimatePresence>
                <NewTaskForm clickedElement={clickedElement} dragBorder={calendarRef} onClose={() => setClickedElement(null)}/>
            </AnimatePresence>)}
        </>
    );
}

export default App;
