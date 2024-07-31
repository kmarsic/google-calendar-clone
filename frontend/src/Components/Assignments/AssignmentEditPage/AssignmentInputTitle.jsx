
import { useDispatch } from "react-redux"
import { modifyTask } from "../../../redux/features/taskSlicer";

/* eslint-disable react/prop-types */
export function AssignmentInputTitle ({data}) {
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        dispatch(modifyTask(["title", data, e.target.value]))
    }
    return (
        <span className="bottom-border-animate form-title">
            <input
                type="text"
                name="title"
                autoFocus
                required
                placeholder="Add title and time"
                value={data.title}
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
            />
        </span>
    )
}