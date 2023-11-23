/* eslint-disable react/prop-types */
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import removeData from "../../redux/features/thunk/removeData";
import { useDispatch } from "react-redux";
import { removeTask } from "../../redux/features/taskSlicer";

export function Assignment({title,task,color}) {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.children[0].innerText == "???") return
        dispatch(removeData(task));
        dispatch(removeTask(task.ID));
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className='assignment' style={{backgroundColor: color}}>
            <p>{title}</p>
            <button>
                <FontAwesomeIcon icon={faXmarkCircle} size="xl" color="#ffffff"/>
            </button>
        </form>
    )
}