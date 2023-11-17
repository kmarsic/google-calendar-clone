/* eslint-disable react/prop-types */
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import removeData from "../../redux/features/thunk/removeData";
import { useDispatch } from "react-redux";
import getData from "../../redux/features/thunk/getData";

export function Assignment({title,id}) {
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.children[0].innerText == "???") return
        await dispatch(removeData(id));
        await dispatch(getData())

    }
    return (
        <form onSubmit={handleSubmit} className='assignment'>
            <p>{title}</p>
            <button>
                <FontAwesomeIcon icon={faXmarkCircle} size="xl" color="#ffffff"/>
            </button>
        </form>
    )
}