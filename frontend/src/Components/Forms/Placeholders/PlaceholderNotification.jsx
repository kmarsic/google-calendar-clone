import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

export function PlaceholderNotification () {
    return (
        <div className="dropdown-input">
                <span className="text-input">30 mins before</span>
                    <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)" size="sm" style={{ cursor: "pointer" }}
                    />
            </div>
    )
}