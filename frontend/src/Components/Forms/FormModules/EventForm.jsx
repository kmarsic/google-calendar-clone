/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot, faComment, faCalendarDay, faBell, faUsers} from "@fortawesome/free-solid-svg-icons";
import { InputUsername, InputTime, InputGuests, InputLocation, InputDescription } from "../Inputs/indexInputs";
import { InputNotification } from "../Inputs/InputNotification/InputNotification";
import { handleFormInputs } from "../../../redux/features/formSlicer";

export function EventForm() {
    return (
        <>
            <div className="icons">
                <FontAwesomeIcon icon={faClock} color="var(--text-body)" size="xl"/>
            </div>
            <InputTime/>

            <div className="icons">
                <FontAwesomeIcon icon={faUsers} color="var(--text-body)" size="xl"/>
            </div>
            <InputGuests/>

            <div className="icons">
                <FontAwesomeIcon icon={faLocationDot} color="var(--text-body)" size="xl"/>
            </div>
            <InputLocation/>

            <div className="icons">
                <FontAwesomeIcon icon={faComment} color="var(--text-body)" size="xl"/>
            </div>
            <InputDescription/>
            
            <div className="icons">
                <FontAwesomeIcon icon={faCalendarDay} color="var(--text-body)" size="xl"/>
            </div>
            <InputUsername/>

            <div className="icons">
                <FontAwesomeIcon icon={faBell} color="var(--text-body" size="xl"/>
            </div>
            <InputNotification reducer={handleFormInputs}/>
        </>
    )
}
