import { useDispatch, useSelector } from "react-redux";
import { formData, handleFormInputs } from "../../../redux/features/formSlicer";

/* eslint-disable react/prop-types */
export function InputLocation() {
    const form = useSelector(formData);
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        dispatch(handleFormInputs({type:'location', payload: e.target.value}))
    }
    return (
        <div className="input-shell">
                <span className="bottom-border-animate">
                    <input
                        className="text-input"
                        autoFocus
                        type="text"
                        name="location"
                        value={form.location}
                        placeholder="Location"
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e)}
                    />
                </span>
        </div>
    )
}