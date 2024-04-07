/* eslint-disable react/prop-types */
import { inputTimeFormat } from "../../../Fncs/timeFormat";
import { EventDataContext, TimeContext } from "../formContext";
import { InputTime } from "./../Inputs/indexInputs";
import { useContext } from "react";

export function PlaceholderTime({ handleFormFields, activeFormField}) {
    const formData = useContext(EventDataContext);
    if (activeFormField.time === "input") {
        return <InputTime/>
    } else return (
        <div className="input-shell">
                <div>
                    <div className="div-flex">
                            <span className="text-input-placeholder" >
                                <span style={{width: formData.startTime.length + 1 + "ch"}} className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(formData.startTime)}
                                </span>
                            </span>
                        <span>&#8212;</span>

                            <span className="text-input-placeholder">
                                <span style={{width: formData.endTime.length + 1 + "ch"}} className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(formData.endTime)}
                                </span>
                            </span>
                        <button className="btn" 
                        onClick={(e) => e.preventDefault()}>Add time</button>
                    </div>
                </div>
            </div>
    )
}