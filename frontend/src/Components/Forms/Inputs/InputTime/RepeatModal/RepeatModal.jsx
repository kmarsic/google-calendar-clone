import { createPortal } from "react-dom";
import { RepeatOn } from "./RepeatOn/RepeatOn";
import { RepeatEnds } from "./RepeatEnds/RepeatEnds";
import { RepeatFooter } from "./RepeatFooter";
import { RepeatEvery } from "./RepeatEvery/RepeatEvery";

export function RepeatModal({ onClose, setCurrentOption, setModal }) {
  return createPortal(
    <>
      <div className="overlay dark" onClick={() => onClose()}></div>
      <div className="repeat-modal-container">
        <h3 className="repeat-modal-title">Custom recurrence</h3>
        <RepeatEvery />
        <RepeatOn />
        <RepeatEnds />
        <RepeatFooter onClose={onClose} setCurrentOption={setCurrentOption} setModal={setModal} />
      </div>
    </>,
    document.body
  );
}
