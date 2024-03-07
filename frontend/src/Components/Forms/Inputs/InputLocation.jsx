import { useContext } from "react"
import { FormDataChangeContext, FormDataContext } from "../formContext"

/* eslint-disable react/prop-types */
export function InputLocation() {
    const formData = useContext(FormDataContext);
    const handleInputChange = useContext(FormDataChangeContext);
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