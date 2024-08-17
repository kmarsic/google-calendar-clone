/* eslint-disable react/prop-types */
import { InputTimeStart } from "./InputTimeStart";
import { InputTimeEnd } from "./InputTimeEnd";
import { useEffect } from "react";
import { TimeFrame } from "./TimeFrame";
import { InputRepeat } from "./RepeatModal/InputRepeat";
import { formData, handleFormInputs } from "../../../../redux/features/formSlicer";
import { useDispatch, useSelector } from "react-redux";

export const InputTime = ({task}) => {
  const dispatch = useDispatch();
  const form = useSelector(formData);
  const time = form.allDay;

  const handleTimeChange = (value) => {
    dispatch(handleFormInputs({type: "allDay",payload: value}));
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
          {task ? (time ? null : <TimeFrame/>) : (time ? <InputTimeEnd /> : <TimeFrame />)}
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
