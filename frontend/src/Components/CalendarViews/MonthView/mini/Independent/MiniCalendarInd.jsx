/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { MiniMonthViewInd } from "./MiniMonthViewInd";
import { miniDate, nextMonthMini, previousMonthMini } from "../../../../../redux/features/dateSlicer";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export function MiniCalendarInd({date, reducer}) {
  const miniViewRef = useRef(null);
  const dispatch = useDispatch();
  const currentDate = new Date(useSelector(miniDate));
  return (
    <div 
    ref={miniViewRef}
    className="form-calendar"
    >
                <div className="mini-nav">
                    <div className='mini-date'>
                    {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                     })}
                    </div>
                    <div className='nav-controls-mini'>
                        <div className="menu-item-mini btn-effect" onClick={() => dispatch(previousMonthMini())}>
                          <FontAwesomeIcon icon={faAngleLeft} style={{color : "#3c4043"}}></FontAwesomeIcon>
                        </div>
                        <div className="menu-item-mini btn-effect" onClick={() => dispatch(nextMonthMini())}>
                          <FontAwesomeIcon icon={faAngleRight} style={{color: "#3c4043"}} ></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <MiniMonthViewInd reducer={reducer}/>
    </div>
    )
}