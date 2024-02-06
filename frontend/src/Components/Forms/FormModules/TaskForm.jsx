/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faComment, faList, faCaretDown } from "@fortawesome/free-solid-svg-icons";
export function TaskForm({ formData, handleInputChange }) {
    return (
        <>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faClock}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="input-shell">
                <input
                    className="text-input"
                    type="text"
                    name="time"
                    autoComplete="off"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange(e)}
                ></input>
            </div>

            <div className="icons">
                <FontAwesomeIcon
                    icon={faComment}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="input-shell">
                <input
                    className="text-input"
                    type="text"
                    name="description"
                    placeholder="Add description or attachments"
                    autoComplete="off"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                    >
                </input>
            </div>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faList}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <div className="dropdown-input">
                <span className="text-input">30 mins before</span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        color="var(--text-body)"
                        size="sm"
                        style={{ cursor: "pointer" }}
                    />
            </div>
        </>
    );
}
