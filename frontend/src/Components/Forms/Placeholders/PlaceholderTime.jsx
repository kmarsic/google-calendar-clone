/* eslint-disable react/prop-types */
import { EventDataContext, TimeContext } from "../formContext";
import { InputTimeStart, InputTimeEnd } from "./../Inputs/indexInputs";
import { useContext } from "react";

export function PlaceholderTime({ handleFormFields, activeFormField}) {
    const formData = useContext(EventDataContext);
    return (
        <div className="input-shell">
                <div>
                    <div className="div-flex">
                        <TimeContext.Provider value="startTime">
                            {activeFormField.startTime == "input" ?
                            <InputTimeStart/>
                            :
                            <span className="text-input-placeholder" >
                                <span style={{width: formData.startTime.length + 1 + "ch"}} className="placeholder-hover" data-name="startTime" onClick={(e) => handleFormFields(e)}>
                                    {formData.startTime}
                                </span>
                            </span>}
                        </TimeContext.Provider>

                        <span>&#8212;</span>

                        <TimeContext.Provider value="endTime">
                            {activeFormField.endTime == "input" ?
                            <InputTimeEnd/>
                            :
                            <span className="text-input-placeholder">
                                <span style={{width: formData.endTime.length + 1 + "ch"}} className="placeholder-hover" data-name="endTime" onClick={(e) => handleFormFields(e)}>
                                    {formData.endTime}
                                </span>
                            </span>}
                        </TimeContext.Provider>
                        <button className="btn" 
                        onClick={(e) => e.preventDefault()}>Add time</button>
                    </div>
                </div>
            </div>
    )
}