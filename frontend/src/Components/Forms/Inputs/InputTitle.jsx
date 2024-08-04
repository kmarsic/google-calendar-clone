import { useDispatch, useSelector } from "react-redux";
import { formData, handleFormInputs } from "../../../redux/features/formSlicer";

/* eslint-disable react/prop-types */
export function InputTitle () {
    const form = useSelector(formData);
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        dispatch(handleFormInputs({type:'title', payload: e.target.value}))
    }
    return (
        <span className="bottom-border-animate form-title">
            <input
                type="text"
                name="title"
                autoFocus
                required
                placeholder="Add title and time"
                value={form.title}
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
            />
        </span>
    )
}