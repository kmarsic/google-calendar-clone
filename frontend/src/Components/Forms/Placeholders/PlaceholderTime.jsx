/* eslint-disable react/prop-types */
import { inputTimeFormat } from "../../../Fncs/Form/timeFormat";
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
                                <span className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(formData.startDate)}
                                </span>
                            </span>
                            <span style={{userSelect: "none"}}>&#8212;</span>

                            <span className="placeholder-time">
                                <span className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(formData.endDate)}
                                </span>
                            </span>
                        </span>
                        <div data-name="time" onClick={(e) => handleFormFields(e)}>Does not repeat</div>
                        </span>
                        <button className="btn" data-name="time" onClick={(e) => {handleFormFields(e); e.preventDefault()}}>Add time</button>
                    </div>
            </div>
    )
}