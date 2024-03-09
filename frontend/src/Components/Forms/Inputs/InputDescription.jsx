import { useContext } from "react"
import { EventChangeContext, EventDataContext } from "../formContext"

/* eslint-disable react/prop-types */
export function InputDescription() {
    const formData = useContext(EventDataContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleDescriptionChange = (e) => {
        dispatchReducer({type: "description", payload: e.target.value})
    }
    return (
        <div className="input-shell">
                <span className="bottom-border-animate">
                    <input
                        className="text-input"
                        autoFocus
                        type="text"
                        name="description"
                        placeholder="Add description or attachments"
                        autoComplete="off"
                        value={formData.description}
                        onChange={(e) => handleDescriptionChange(e)}
                    />
                </span>
        </div>
    )
}