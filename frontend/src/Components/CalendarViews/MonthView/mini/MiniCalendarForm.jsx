/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { MiniMonthViewForm } from "./MiniMonthViewForm";
import { useDispatch, useSelector } from "react-redux";
import { miniDate, nextMonthMini, previousMonthMini } from "../../../../redux/features/dateSlicer";
import { useRef } from "react";

export function MiniCalendarForm() {
    const dispatch = useDispatch();
    const date = new Date(useSelector(miniDate));
    const miniViewRef = useRef(null);

    return (
    <div 
    ref={miniViewRef}
    className="form-calendar"
    >
                <div className="mini-nav">
                    <div className='mini-date'>
                    {date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                     })}
                    </div>
                    <div className='nav-controls-mini'>
                        <div className="menu-item-mini" onClick={() => dispatch(previousMonthMini())}>
                          <FontAwesomeIcon icon={faAngleLeft} style={{color : "#3c4043"}}></FontAwesomeIcon>
                        </div>
                        <div className="menu-item-mini" onClick={() => dispatch(nextMonthMini())}>
                          <FontAwesomeIcon icon={faAngleRight} style={{color: "#3c4043"}} ></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <MiniMonthViewForm/>
    </div>
    )
}