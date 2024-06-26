import { createPortal } from "react-dom";
import { RepeatOn } from "./RepeatOn";
import { RepeatEnds } from "./RepeatEnds";
import { RepeatFooter } from "./RepeatFooter";
import { RepeatEvery } from "./RepeatEvery";

export function RepeatModal({ onClose }) {

  return createPortal(
    <>
      <div className="overlay dark" onClick={onClose}></div>
      <div className="repeat-modal-container">
        <h3 className="repeat-modal-title">Custom recurrence</h3>
        <div>
            <RepeatEvery/>
            <RepeatOn/>
            <RepeatEnds/>
        </div>
        <RepeatFooter/>
      </div>
    </>, document.body
  );
}