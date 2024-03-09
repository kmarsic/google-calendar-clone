/* eslint-disable react/prop-types */
import { EventDataContext, TimeContext } from "../formContext";
import { InputTimeStart, InputTimeEnd } from "./../Inputs/indexInputs";
import { useState, useLayoutEffect, useRef, useContext } from "react";

export function PlaceholderTime({ handleFormFields, activeFormField}) {
    const formData = useContext(EventDataContext);
    const [inputWidth, setInputWidth] = useState(0);
    const ref = useRef(null);
    useLayoutEffect(() => {
        setInputWidth(ref.current.offsetWidth);
    }, [])

    return (
        <div className="input-shell">
                <div>
                    <div className="div-flex">
                        <TimeContext.Provider value="startTime">
                            {activeFormField.startTime == "input" ?
                            <InputTimeStart inputWidth={inputWidth}/>
                            :
                            <span className="text-input-placeholder" ref={ref} >
                                <span className="placeholder-hover" data-name="startTime" onClick={(e) => handleFormFields(e)}>
                                    {formData.startTime}
                                </span>
                            </span>}
                        </TimeContext.Provider>

                        <span>&#8212;</span>

                        <TimeContext.Provider value="endTime">
                            {activeFormField.endTime == "input" ?
                            <InputTimeEnd inputWidth={inputWidth}/>
                            :
                            <span className="text-input-placeholder">
                                <span className="placeholder-hover" data-name="endTime" onClick={(e) => handleFormFields(e)}>
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