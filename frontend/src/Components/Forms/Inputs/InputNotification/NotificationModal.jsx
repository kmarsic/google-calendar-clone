import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { EventDataContext, NotificationChangeContext, NotificationContext } from "../../formContext";
import { NotificationTypeSelect } from "./NotificationTypeSelect";
import { NumberInput } from "./NotificationNumberInput";
import { NotificationUnitSelect } from "./NotificationUnitSelect";

export function NotificationModal({onClose}) {
    const formData = useContext(EventDataContext);
    const [notificationData, dispatchReducer] = useReducer(reducer,{
        type: "Notification",
        duration: "1",
        unit: "days",
        time: formData.startDate
    })

    function reducer(state, action) {
        switch (action.type) {
            case 'type': {
                return {
                    ...state,
                    type: action.payload
                }
            }
            case 'duration': {
                return {
                    ...state,
                    duration: action.payload
                }
            }
            case 'unit': {
                return {
                    ...state,
                    unit: action.payload
                }
            }
            case 'time': {
                return {
                    ...state,
                    time: action.payload
                }
            }
    }}

    return (
        <>
        <NotificationContext.Provider value={notificationData}>
            <NotificationChangeContext.Provider value={dispatchReducer}>
                <>
                    <div className="overlay dark" onClick={onClose}></div>
                    <div className="notification-modal-container">
                        <h2 className="notification-modal-title">Custom notification</h2>
                        <div className="notification-select">
                            <NotificationTypeSelect/>
                            <NumberInput/>
                            <NotificationUnitSelect/>
                            {formData.allDay === true ? 
                            <>
                            <div className="modal-option">before at</div>
                            <div className="modal-option"> y</div> 
                            </>
                            : null}
                        </div>
                        <div className="div-flex">
                            <div>Cancel</div>
                            <div>Done</div>
                        </div>
                    </div>
                </>
            </NotificationChangeContext.Provider>
        </NotificationContext.Provider>
        </>
    )
}