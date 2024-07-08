import { createPortal } from "react-dom";
import { RepeatOn } from "./RepeatOn/RepeatOn";
import { RepeatEnds } from "./RepeatEnds";
import { RepeatFooter } from "./RepeatFooter";
import { RepeatEvery } from "./RepeatEvery/RepeatEvery";
import { useReducer } from "react";
import { createContext } from "react";

export const RepeatStateContext = createContext(null);
export const ChangeRepeatStateContext = createContext(null);
export const RepeatDataContext = createContext(null);
export const ChangeRepeatDataContext = createContext(null);

export function RepeatModal({ onClose }) {
  const [modalState, setModalState] = useReducer(stateReducer,{
    every: "week",
    ends: {
      never: false,
      on: false,
      after: false
    },
  });

  const [modalData, setModalData] = useReducer(dataReducer, {
    everyUnit: 1,
    repeatOn: "",
    endOn: ""
  });

  return createPortal(
    <>
      <RepeatStateContext.Provider value={modalState}>
        <ChangeRepeatStateContext.Provider value={setModalState}>
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
        </ChangeRepeatStateContext.Provider>  
      </RepeatStateContext.Provider>
    </>, document.body
  );
}

function stateReducer(state, action) {
  switch (action.type) {
    case "every":
      return { ...state, every: action.payload };
    case "ends":
      return { ...state, ends: action.payload };
      default:
        return state;
  }
}

function dataReducer(state, action) {
  switch (action.type) {
    case "everyUnit":
      return { ...state, everyUnit: action.payload };
    case "repeatOn":
      return { ...state, repeatOn: action.payload };
    case "endOn":
      return { ...state, endOn: action.payload };
      default:
        return state;
  }
}