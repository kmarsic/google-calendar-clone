/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./styles/_index.scss";
// components
import { Navigation } from "./Components/Nav/Navigation";
import { Sidebar } from "./Components/Sidebar/Sidebar";

import { SiteRouter } from "./SiteRouter";
import { NewTaskForm } from "./Components/Forms/NewTaskForm";
//deps
import { currentDate, setFocusDate } from "./redux/features/dateSlicer";
import getData from "./redux/features/thunk/getData";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { TitleTab } from "./TitleTab";

function App() {
    const [burger, setBurgerOpen] = useState(false);
    const [clickedElement, setClickedElement] = useState(null);
    const calendarRef = useRef(null);

    const dispatch = useDispatch();

    const date = new Date(useSelector(currentDate));
    const today = new Date().getDate();

    useEffect(() => {
        dispatch(getData());
    }, []);
    
    const faviconHref = (num) => `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${num}.ico`;

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
                    <AnimatePresence>
                        {clickedElement && (
                            <>
                                <NewTaskForm
                                    clickedElement={clickedElement}
                                    dragBorder={calendarRef}
                                    onClose={() => setClickedElement(null)}
                                />
                                <div
                                    className="overlay"
                                    onClick={() => setClickedElement(null)}
                                ></div>
                            </>
                        )}
                    </AnimatePresence>
                    <Sidebar burgerOpen={burger} />
                    <SiteRouter />
                </div>
            </AnimatePresence>
        </>
    );
}

export default App;
