/* eslint-disable react/prop-types */
import { InputTimeStart } from "./InputTimeStart";
import { InputTimeEnd } from "./InputTimeEnd";
import { useEffect, useContext } from "react";
import { TimeFrame } from "./TimeFrame";
import { EventChangeContext, EventDataContext } from "../../formContext";
import { InputRepeat } from "./RepeatModal/InputRepeat";

export const InputTime = () => {
  const dispatchReducer = useContext(EventChangeContext);
  const formData = useContext(EventDataContext);

  const time = formData.allDay;

  const handleTimeChange = (value) => {
    dispatchReducer({ type: "allDay", payload: value });
  };

  useEffect(() => {
    const checkbox = document.getElementById("time-checkbox");
    if (time === true) {
      checkbox.checked = true;
    } else checkbox.checked = false;
  }, [time]);

  return (
    <div className="input-shell">
      <div>
        <div className="div-flex">
          <InputTimeStart />
          {time ? <InputTimeEnd /> : <TimeFrame />}
        </div>
        <div>
          <div className="all-day">
            <input
              type="checkbox"
              id="time-checkbox"
              onChange={() => handleTimeChange(!time)}
            />
            <span>All Day</span>
          </div>
          <InputRepeat />
        </div>
      </div>
    </div>
  );
};
