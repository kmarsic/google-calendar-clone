import { useContext, useEffect, useState } from "react";
import { NotificationChangeContext, NotificationContext } from "../../formContext";
import _ from 'lodash';

export function NumberInput() {
    const context = useContext(NotificationContext);
    const dispatchReducer = useContext(NotificationChangeContext);
    const unit = context.unit;
    const value = context.duration;

    const [error, setError] = useState(false);
    const errorMessages = {
        days: "Must be between 0 and 29 days",
        weeks: "Must be between 0 and 4 weeks",
        minutes: "Must be between 0 and 40320 minutes",
        hours: "Must be between 0 and 672 hours"
    }

    const errorHandler = () => {
        if (value === "") {
            setError(true);
            return;
        }

        switch(unit) {
            case "days":
                if (_.inRange(value, 0, 29)) {
                    setError(false)
                } else setError(true);
                break;
                case "weeks":
                    if (_.inRange(value, 0, 5)) {
                        setError(false)
                    } else setError(true);
                    break;
                case "minutes":
                    if (_.inRange(value, 0, 40321)) {
                        setError(false)
                    } else setError(true);
                    break;
                case "hours":
                    if (_.inRange(value, 0, 673)) {
                        setError(false)
                    } else setError(true);
                    break;
        }
    }
    
    useEffect(() => {
        errorHandler();
    }, [context])

    return (
        <div className="notification-modal-option">
            <span className={error ? "bottom-border-error padding" : "bottom-border-animate padding"}>
                <input id="notification-number" min={0} type="number" value={value} onChange={(e) => dispatchReducer({type: "duration", payload: e.target.value })}/>
            </span>
            {error ? <span className="box-hover">{errorMessages[unit]}</span> : null}
        </div>
    )
}