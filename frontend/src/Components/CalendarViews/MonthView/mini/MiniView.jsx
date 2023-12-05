/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { MiniMonthView } from "./MiniMonthView";
import { useDispatch, useSelector } from "react-redux";
import { miniDate, nextMonthMini, previousMonthMini } from "../../../../redux/features/dateSlicer";
import { useEffect, useRef } from "react";

export function MiniView({embed}) {
    const date = new Date(useSelector(miniDate));
    const dispatch = useDispatch();
    const miniViewRef = useRef(null);

    useEffect(() => {
        // Timeout to ensure the component is in the DOM before adding the class
        const timeoutId = setTimeout(() => {
          miniViewRef.current.classList.add('visible');
        }, 10);
    
        // Clear the timeout on component unmount
        return () => clearTimeout(timeoutId);
      }, []);

    return (
    <div ref={miniViewRef} className={embed ? "embed" : null}>
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
                <MiniMonthView/>
    </div>
    )
}