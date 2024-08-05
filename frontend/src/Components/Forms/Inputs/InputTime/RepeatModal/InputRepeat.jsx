import { useReducer, useRef, useState } from "react";
import { createContext } from "react";
import { RepeatDropdown } from "./RepeatDropdown";
import { currentDayOccurrence } from "../../../../../Fncs/indexFncs";
import { inputTimeFormatShort } from "../../../../../Fncs/Form/timeFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { RepeatModal } from "./RepeatModal";
import { useSelector } from "react-redux";
import { formData } from "../../../../../redux/features/formSlicer";

export const RepeatDataContext = createContext(null);
export const ChangeRepeatDataContext = createContext(null);

export function InputRepeat() {
    const form = useSelector(formData);
    const currDate = new Date(form.startDate);
    const nextMonth = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDay());
    const weekDay = currDate.toLocaleDateString(undefined, {weekday: "long"});

    const [customModal, setCustomModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [currentOption, setCurrentOption] = useState("Does not repeat");

  const [customOptionData, setCustomOptionData] = useReducer(reducer, 
    {
        visible: false,
        unit: "weeks",
        repeatIndex: 1,
        repeatsOn: {
            calDay: "weekDay",
            calMonth: currDate.getMonth(),
            occurenceIndex: currentDayOccurrence(formData),
            occurenceWeekDays: [currDate.getDay()],
            occurenceDay: currDate.getDate(),
        },
        repeatEnds: {
            state: "Never",
            date: inputTimeFormatShort(nextMonth),
            after: 30
        }
    }
  )
  const repeatList = [
    "Does not repeat", 
    "Daily", 
    `Weekly on ${weekDay}`, 
    `Monthly on the ${currentDayOccurrence(form)} ${weekDay}`, 
    `Annually on ${weekDay}`, "Every weekday (Monday to Friday)", 
    "Custom..."
  ];
  const dropdownRef = useRef(null);

  return (
    <>
      <RepeatDataContext.Provider value={customOptionData}>
        <ChangeRepeatDataContext.Provider value={setCustomOptionData}>
          <span
            className="dropdown-container repeat-dropdown-container"
            ref={dropdownRef}
            onClick={() => setDropdown(!dropdown)}
          >
            <span>{currentOption}</span>
            <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" />
            {dropdown ? (
              <RepeatDropdown
                container={dropdownRef}
                list={repeatList}
                setDropdown={setDropdown}
                setCurrentOption={setCurrentOption}
                setCustomModal={setCustomModal}
                currentOption={currentOption}
              />
            ) : null}
          </span>
          {customModal && <RepeatModal onClose={() => setCustomModal(false)} setCurrentOption={setCurrentOption} setModal={setCustomModal}/>}
        </ChangeRepeatDataContext.Provider>
      </RepeatDataContext.Provider>
    </>
  );
}

function reducer(state, action) {
    switch (action.type) {
      case "unit":
        return {
          ...state,
          unit: action.payload,
        };
      case "repeatInterval":
        return {
          ...state,
          repeatInterval: action.payload,
        };
      case "repeatOnWeekDays":
        return {
          ...state,
          repeatOnWeekDays: action.payload,
        };
      case "repeatOnDayIndex":
        return {
          ...state,
          repeatOnDayIndex: action.payload,
        };
      case "repeatOnWeekDayOccurence":
        return {
          ...state,
          repeatOnWeekDayOccurence: action.payload,
        };
      case "endOn":
        return {
          ...state,
          endOn: action.payload,
        };
      case "endAfterOccurences":
        return {
          ...state,
          endAfterOccurences: action.payload,
        };
        case "date":
          console.log(state)
        return {
          ...state,
          repeatEnds: {
            date: action.payload
          }
        };
      default:
        return state;
    }
  }
