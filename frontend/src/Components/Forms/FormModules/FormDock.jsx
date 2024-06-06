/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripLines, faXmark } from "@fortawesome/free-solid-svg-icons"

export function FormDock({startDrag, onClose}) {
    return (
        <div className="form-dock" onMouseDown={startDrag}>
                <FontAwesomeIcon icon={faGripLines} color="var(--text-body)" size="lg" className="btn-round btn-effect"/>
                <FontAwesomeIcon onClick={onClose} color="var(--text-body)" icon={faXmark} size="lg" className="btn-round btn-effect"/>
        </div>
    )
}