import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setView } from "../redux/features/dateSlicer";
export function ViewDropdown () {
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          dropdownRef.current.classList.add('visible');
        }, 10);
    
        return () => clearTimeout(timeoutId);
      }, []);
    return (
        <>
            <ul ref={dropdownRef} className="dropdown">
                    <li onClick={() => dispatch(setView("Day"))}>
                        <Link to={"/day"}>
                            <div>Day</div>
                            <div>D</div>
                        </Link>
                    </li>
                    <li onClick={() => dispatch(setView("Week"))}>
                        <Link to={"/week"}>
                            <div>Week</div>
                            <div>W</div>
                        </Link>
                    </li>
                    <li onClick={() => dispatch(setView("Month"))}>
                        <Link to={"/month"}>
                            <div>Month</div>
                            <div>M</div>
                        </Link>
                    </li>
                    <li onClick={() => dispatch(setView("Year"))}>
                        <Link to={"/year"}>
                            <div>Year</div>
                            <div>Y</div>
                        </Link>
                    </li>
            </ul>
        </>
    )
}