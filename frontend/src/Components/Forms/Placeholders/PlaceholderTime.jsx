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

                    <div className="div-flex">
                        <span className="placeholder-container" data-name="time" onClick={(e) => handleFormFields(e)}>
                        <span className="div-flex">
                            <span className="placeholder-time" >
                                <span style={{width: formData.startTime.length + 1 + "ch"}} className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(formData.startTime)}
                                </span>
                            </span>
                            <span style={{userSelect: "none"}}>&#8212;</span>

                            <span className="placeholder-time">
                                <span style={{width: formData.endTime.length + 1 + "ch"}} className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(formData.endTime)}
                                </span>
                            </span>
                        </span>
                        <div data-name="time" onClick={(e) => handleFormFields(e)}>Does not repeat</div>
                        </span>
                        <button className="btn" onClick={(e) => e.preventDefault()}>Add time</button>
                    </div>
            </div>
    )
}