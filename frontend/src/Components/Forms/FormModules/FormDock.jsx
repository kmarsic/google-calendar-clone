/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripLines, faXmark } from "@fortawesome/free-solid-svg-icons"

export function FormDock({startDrag, onClose}) {
    return (
        <div className="form-dock" onMouseDown={startDrag}>
                <button className="btn-round">
                    <FontAwesomeIcon icon={faGripLines} color="rgb(139, 143, 147)" size="xl"/>
                </button>
                <FontAwesomeIcon className="btn-round" onClick={() => onClose()} cursor={"pointer"} icon={faXmark} size="xl"/>
        </div>
    )
}