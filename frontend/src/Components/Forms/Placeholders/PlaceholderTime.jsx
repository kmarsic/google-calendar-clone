/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { inputTimeFormat } from "../../../Fncs/Form/timeFormat";
import { InputTime } from "./../Inputs/indexInputs";
import { formData, handleFormInputs } from "../../../redux/features/formSlicer";

export function PlaceholderTime({ handleFormFields, activeFormField, task}) {
    const form = useSelector(formData);
    const dispatch = useDispatch();

    const handleTimeChange = (value) => {
        dispatch(handleFormInputs({type: "allDay", payload: value}))
    }

    if (activeFormField.time === "input") {
        return <InputTime task={task}/>
    } else return (
        <div className="input-shell">

                    <div className="div-flex">
                        <span className="placeholder-container" data-name="time" onClick={(e) => handleFormFields(e)}>
                        <span className="div-flex">
                            <span className="placeholder-time" >
                                <span className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                    {inputTimeFormat(form.startDate)}
                                </span>
                            </span>

                            {task ? null : 
                            <>
                            <span style={{userSelect: "none"}}>&#8212;</span>
                            <span className="placeholder-time">
                            <span className="placeholder-hover" data-name="time" onClick={(e) => handleFormFields(e)}>
                                {inputTimeFormat(form.endDate)}
                            </span>
                            </span>
                            </>}
                        </span>
                        <div data-name="time" onClick={(e) => handleFormFields(e)}>Does not repeat</div>
                        </span>
                        <button className="btn" data-name="time" onClick={(e) => {handleFormFields(e); e.preventDefault();handleTimeChange(false)}}>Add time</button>
                    </div>
            </div>
    )
}