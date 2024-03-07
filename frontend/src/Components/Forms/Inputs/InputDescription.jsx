import { useContext } from "react"
import { FormDataChangeContext, FormDataContext } from "../formContext"

/* eslint-disable react/prop-types */
export function InputDescription() {
    const formData = useContext(FormDataContext);
    const inputChange = useContext(FormDataChangeContext);
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
                        onChange={(e) => inputChange(e)}
                    />
                </span>
        </div>
    )
}