import { useContext, useEffect, useState } from "react";
import { ChangeRepeatDataContext } from "../InputRepeat";
import { useSelector } from "react-redux";
import { formData } from "../../../../../../redux/features/formSlicer";

export function RepeatWeekly() {
  const setContext = useContext(ChangeRepeatDataContext);
  const form = useSelector(formData);

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const longDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [selectedDays, setSelectedDays] = useState(
    [new Date(form.startDate).getDay()],
  );
  const weekDay = new Date(form.startDate).getDay();

  const handeClick = (index) => {
    if (index === weekDay && selectedDays.length === 1 && selectedDays.includes(index)) {
      return;
    } else if (selectedDays.includes(index)) {
      const newList = selectedDays.filter((currIndex) => currIndex !== index);
      setSelectedDays(newList);
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  useEffect(() => {
    setContext({ type: "updateRepeatOnWeekDays", payload: selectedDays });
  }, [selectedDays]);

  useEffect(() => {
    if (selectedDays.length === 0 ) {
      setSelectedDays([...selectedDays, new Date(formData.startDate).getDay()]);
    } else return;
  }, [selectedDays]);

  useEffect(() => {
    return () => {
      setContext({ type: "updateRepeatOnWeekDays", payload: [] });
    };
  }, []);

  return (
    <div>
      <p style={{ marginBottom: 12 }}>Repeat on</p>
      <div className="div-flex" style={{ gap: 6, marginBottom: 20 }}>
        {dayNames.map((day, index) => {
          return (
            <>
              <div
                key={index}
                onClick={() => handeClick(index)}
                className={
                  selectedDays.includes(index)
                    ? "btn-small btn-focus repeat-index"
                    : "btn-small btn-gray repeat-index"
                }
              >
                {day}
                <span className="box-hover">{longDayNames[index]}</span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
