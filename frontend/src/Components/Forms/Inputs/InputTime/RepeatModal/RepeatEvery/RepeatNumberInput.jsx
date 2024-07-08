import { useContext, useState } from "react";
import { ChangeRepeatDataContext, RepeatDataContext } from "../RepeatModal";

export function RepeatNumberInput() {
    const dataContext = useContext(RepeatDataContext);
    const setDataContext = useContext(ChangeRepeatDataContext);
    const value = dataContext.everyUnit;

    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
      if (e.target.value > 9999 || e.target.value < 0) return;
      setError(false);
      setDataContext({type: "everyUnit", payload: e.target.value})
      
    }

    const handleError = (e) => {
      if (e.key === "-") {
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
            id="repeat-number"
            type="number"
            min={0}
            value={value}
            onKeyDown={(e) => handleError(e)}
            onChange={(e) => handleSubmit(e)}
          />
        </span>
        {error ? (
        <span className="box-hover">
          Must be greater than one
        </span>
      ) : null}
      </div>
    );
  }