import { createPortal } from "react-dom";
import { RepeatOn } from "./RepeatOn/RepeatOn";
import { RepeatEnds } from "./RepeatEnds/RepeatEnds";
import { RepeatFooter } from "./RepeatFooter";
import { RepeatEvery } from "./RepeatEvery/RepeatEvery";
import { useContext, useReducer } from "react";
import { createContext } from "react";
import { EventDataContext } from "../../../formContext";

export const RepeatDataContext = createContext(null);
export const ChangeRepeatDataContext = createContext(null);

export function RepeatModal({ onClose }) {
  const formData = useContext(EventDataContext);
  const [modalData, setModalData] = useReducer(dataReducer, {
    unit: "weeks",
    repeatInterval: 1,
    repeatOnWeekDays: [
      new Date(formData.startDate).getDay(),
    ],
    repeatOnDayIndex : "",
    repeatOnWeekDayOccurence: "",
    endOn: "",
    endAfterOccurences: 13
  });

  return createPortal(
    <>
          <RepeatDataContext.Provider value={modalData}>
            <ChangeRepeatDataContext.Provider value={setModalData}>
            <div className="overlay dark" onClick={onClose}></div>
            <div className="repeat-modal-container">
              <h3 className="repeat-modal-title">Custom recurrence</h3>
              <RepeatEvery/>
              <RepeatOn/>
              <RepeatEnds/>
              <RepeatFooter/>
            </div>
            </ChangeRepeatDataContext.Provider>
          </RepeatDataContext.Provider>
    </>, document.body
  );
}

function dataReducer(state, action) {
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
    default:
      return state;
  }
}