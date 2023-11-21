/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faLocationDot, faComment } from "@fortawesome/free-solid-svg-icons"
export function EventForm ({formData, handleInputChange}) {
    return (
    <>
        <div className="icons">
                        <FontAwesomeIcon
                        icon={faClock}
                        color="var(--text-body)"
                        size="lg"/>
                    </div>
            <div className="input-shell">
                <input
                    type="text"
                    id="time"
                    autoComplete="off"
                    value={formData.time}
                    onChange={(e) => handleInputChange(e)}>
                </input>

            </div>
            <div className="icons">
                        <FontAwesomeIcon
                        icon={faLocationDot}
                        color="var(--text-body)"
                        size="lg"/>
                    </div>
            <div className="input-shell">
                <input
                    type="text"
                    id="location"
                    value={formData.location}
                    placeholder="Location"
                    autoComplete="off"
                    onChange={(e) => handleInputChange(e)}>
                </input>
            </div>
            <div className="icons">
                    <FontAwesomeIcon
                        icon={faComment}
                        color="var(--text-body)"
                        size="lg"
                        />
                </div>
            <div className="input-shell">
                    <input
                    type="text"
                    id="description"
                    placeholder="Add description or attachments"
                    autoComplete="off"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                    >
                </input>
            </div>
        </>
    )
}