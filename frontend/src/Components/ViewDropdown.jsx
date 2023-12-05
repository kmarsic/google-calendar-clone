import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
export function ViewDropdown () {
    const dropdownRef = useRef(null);
    useEffect(() => {
        // Timeout to ensure the component is in the DOM before adding the class
        const timeoutId = setTimeout(() => {
          dropdownRef.current.classList.add('visible');
        }, 10);
    
        // Clear the timeout on component unmount
        return () => clearTimeout(timeoutId);
      }, []);
    return (
        <>
            <ul ref={dropdownRef} className="dropdown">
                    <li>
                        <Link to={"/day"}>
                            <div>Day</div>
                            <div>D</div>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/week"}>
                            <div>Week</div>
                            <div>W</div>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/month"}>
                            <div>Month</div>
                            <div>M</div>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/year"}>
                            <div>Year</div>
                            <div>Y</div>
                        </Link>
                    </li>
            </ul>
        </>
    )
}