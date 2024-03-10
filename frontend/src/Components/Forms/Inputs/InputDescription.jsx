import { useContext, useState } from "react"
import { EventChangeContext, EventDataContext } from "../formContext"
import Editor from 'react-simple-wysiwyg'

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
                    <Editor className="text-input" value={formData.description} onChange={handleDescriptionChange}/>
                </span>
        </div>
    )
}