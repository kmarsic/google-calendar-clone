import { useContext, useState } from "react";
import { ChangeRepeatDataContext, RepeatDataContext } from "../RepeatModal";

export function RepeatNumberInput() {
    const dataContext = useContext(RepeatDataContext);
    const setDataContext = useContext(ChangeRepeatDataContext);
    const value = dataContext.repeatInterval;

    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
      if (e.target.value > 9999 || e.target.value < 1 && e.target.value !== "") return;
      setError(false);
      setDataContext({type: "repeatInterval", payload: e.target.value})
      
    }

    const handleError = (e) => {
      if (e.key === "-" || e.key === "0" || e.key === "." ||e.key === "+") {
        setError(true)
        e.preventDefault();
      } else if(e.key === "+") {
        e.preventDefault();
      } else setError(false)
    }

    return (
      <div className="repeat-option">
        <span className={
          error ?
          "bottom-border-error padding" :
          "bottom-border-animate padding"
        }>
          <input
            className="repeat-number"
            type="number"
            min={0}
            value={value}
            onKeyDown={(e) => handleError(e)}
            onChange={(e) => handleSubmit(e)}
          />
        </span>
        {error ? (
        <span className="box-hover number-input-error">
          Must be greater than one
        </span>
      ) : null}
      </div>
    );
  }