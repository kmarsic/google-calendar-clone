/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faComment, faList } from "@fortawesome/free-solid-svg-icons";
import { PlaceholderTime } from "../Placeholders/PlaceholderTime";
import { useState } from "react";
import { PlaceholderDescription } from "../Placeholders/PlaceholderDescription";
import { PlaceholderList } from "../Placeholders/PlaceholderList";

export function TaskForm() {
    const [activeFormField, setActiveFormField] = useState({
        timeStart: "placeholder",
        timeEnd: "placeholder",
        guest: "placeholder",
        location: "placeholder",
        description: "placeholder",
        user: "placeholder"
    })

    function handleFormFields(e) {
        setActiveFormField({
            ...activeFormField,
            [e.target.dataset.name] : "input"
        })
    }
    return (
        <>
            <div className="icons">
                <FontAwesomeIcon
                    icon={faClock}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>

            <PlaceholderTime activeFormField={activeFormField} handleFormFields={handleFormFields}/>

            <div className="icons">
                <FontAwesomeIcon
                    icon={faComment}
                    color="var(--text-body)"
                    size="xl"
                />
            </div>

            <PlaceholderDescription activeFormField={activeFormField} handleFormFields={handleFormFields}/>

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
