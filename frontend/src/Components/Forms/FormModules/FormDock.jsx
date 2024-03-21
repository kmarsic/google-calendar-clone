/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripLines, faXmark } from "@fortawesome/free-solid-svg-icons"

export function FormDock({startDrag, onClose}) {
    return (
        <div className="form-dock" onMouseDown={startDrag}>
                <button className="btn-round btn-effect">
                    <FontAwesomeIcon icon={faGripLines} color="var(--text-body)" size="lg"/>
                </button>
                <button className="btn-round btn-effect" onClick={() => onClose()}>
                    <FontAwesomeIcon color="var(--text-body)" icon={faXmark} size="lg"/>
                </button>
        </div>
    )
}