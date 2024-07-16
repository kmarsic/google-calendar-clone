import { useContext} from "react";
import { ChangeRepeatDataContext, RepeatDataContext } from "./InputRepeat";

export function RepeatFooter ({setCurrentOption, onClose, setModal}) {
    const customOption = useContext(RepeatDataContext);
    const setCustomOption = useContext(ChangeRepeatDataContext);

    const handleSubmit = () => {
        setCustomOption({type: "visible", payload: true});
        setModal(false);
    }
    return (
        <div className="div-flex" style={{marginTop: "30px", justifyContent: "right"}}>
            <button onClick={() => onClose()} className="btn-big">Cancel</button>
            <button onClick={() => handleSubmit()} className="btn-main-transparent btn-big">Done</button>
        </div>
    )
}