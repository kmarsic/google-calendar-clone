import { useContext } from "react"
import { EventChangeContext, EventDataContext } from "../formContext"

/* eslint-disable react/prop-types */
export function InputTitle () {
    const formData = useContext(EventDataContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleInputChange = (e) => {
        dispatchReducer({type:'title', payload: e.target.value})
    }
    return (
        <span className="bottom-border-animate form-title">
            <input
                type="text"
                name="title"
                autoFocus
                required
                placeholder="Add title and time"
                value={formData.title}
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
            />
        </span>
    )
}