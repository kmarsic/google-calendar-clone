/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faComment, faList } from "@fortawesome/free-solid-svg-icons";
import { PlaceholderList } from "../Placeholders/PlaceholderList";
import { InputDescription } from "../Inputs/InputDescription";
import { InputTime } from "../Inputs/indexInputs";

export function TaskForm() {
    return (
        <>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faClock}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <InputTime/>

            <div className="icons">
                <FontAwesomeIcon
                    icon={faComment}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <InputDescription/>

            <div className="icons">
                <FontAwesomeIcon
                    icon={faList}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>
            <PlaceholderList/>
        </>
    );
}
