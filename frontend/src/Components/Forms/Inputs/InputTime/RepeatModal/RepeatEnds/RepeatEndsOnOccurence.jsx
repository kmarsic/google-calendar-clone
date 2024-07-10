import { useContext, useEffect, useRef, useState } from "react";
import { ChangeRepeatDataContext, RepeatDataContext } from "../RepeatModal";

export function RepeatEndsOnOccurence({active}) {
    const dataContext = useContext(RepeatDataContext);
    const setDataContext = useContext(ChangeRepeatDataContext);
    const value = dataContext.endAfterOccurences;

    const inputRef = useRef(null);

    const [error, setError] = useState(false);

    function isDecimalNumber(input) {
        const number = parseFloat(input);
        return !isNaN(number) && input.toString().includes('.');
    }

    const handleSubmit = (e) => {
      if (e.target.value > 9999 || e.target.value < 1 && e.target.value !== "") {
        return
      }
      else if (isDecimalNumber(e.target.value)) {
        e.preventDefault()
        return
      } else {
        setError(false);
        setDataContext({type: "endAfterOccurences", payload: e.target.value})
      }
      
    }

    const handleError = (e) => {
      if (e.key === "-" || e.key === "0" ||e.key === "+" || e.key === ".") {
        setError(true)
        e.preventDefault();
      } else setError(false)
    }

    useEffect(() => {
      active === "After" ? inputRef.current.disabled = false : inputRef.current.disabled = true
    }, [active])

    return (
      <div className={active === "After" ? "repeat-option" : "repeat-option disabled"}>
        <span className={
          error ?
          "bottom-border-error padding" :
          "bottom-border-animate padding"
        }>
          <input
            className="repeat-number"
            type="number"
            ref={inputRef}
            min={0}
            value={value}
            onKeyDown={(e) => handleError(e)}
            onChange={(e) => handleSubmit(e)}
          />
        </span>
        <div>
        <div className="padding">occurences</div>
        </div>
        {error ? (
        <span className="box-hover number-input-error">
          Must be greater than one
        </span>
      ) : null}
      </div>
    );
  }