import { useContext } from "react"
import { EventChangeContext, EventDataContext } from "../formContext"

/* eslint-disable react/prop-types */
export function InputLocation() {
    const formData = useContext(EventDataContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleInputChange = (e) => {
        dispatchReducer({type: "location", payload: e.target.value})
    }
    return (
        <div className="input-shell">
                <span className="bottom-border-animate">
                    <input
                        className="text-input"
                        autoFocus
                        type="text"
                        name="location"
                        value={formData.location}
                        placeholder="Location"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e)}
                    />
                </span>
        </div>
    )
}