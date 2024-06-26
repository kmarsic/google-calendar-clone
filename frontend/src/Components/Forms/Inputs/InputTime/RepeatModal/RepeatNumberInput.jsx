import { useState } from "react";

export function RepeatNumberInput() {
    const [error, setError] = useState(false);
    const errorMessages = {
      days: "Must be between 0 and 28 days",
      weeks: "Must be between 0 and 4 weeks",
      minutes: "Must be between 0 and 40320 minutes",
      hours: "Must be between 0 and 672 hours",
    };
  
    return (
      <div className="repeat-option">
        <span
          className={
            error
              ? "bottom-border-error padding"
              : "bottom-border-animate padding"
          }
        >
          <input
            id="repeat-number"
            min={0}
            type="number"
            value="2"
          />
        </span>
        {error ? (
          <span className="box-hover">
            {errorMessages[1]}
          </span>
        ) : null}
      </div>
    );
  }