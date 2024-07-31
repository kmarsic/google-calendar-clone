/* eslint-disable react/prop-types */
//styles
import "./../../styles/_index.scss";
//dependencies
import { motion, useDragControls } from "framer-motion";
import { useState, useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { EventDataContext, EventChangeContext } from "./formContext";
//redux
import postData from "../../redux/features/thunk/postData";
import { addTask } from "../../redux/features/taskSlicer";
//components and functions
import { calcModalPosition, startDateMatch, endDateMatch, timeMatch } from "../../Fncs/indexFncs";
import { InputTitle } from "./Inputs/InputTitle";
import { FormFooter, EventType, FormDock } from "./FormModules/indexFormModules"
import { currentView } from "../../redux/features/dateSlicer";
import { formData, handleFormInputs } from "../../redux/features/formSlicer";


export function NewTaskForm({ clickedElement, onClose, dragBorder }) {
    const dispatch = useDispatch();
    const form = useSelector(formData)
    const view = useSelector(currentView);
    const dragControls = useDragControls();
    console.log(form)

    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [bottomBorder, setBottomBorder] = useState(false);

    useEffect(() => {
        dispatch(handleFormInputs(["type", clickedElement.type ? clickedElement.type : "form-event"]))
        dispatch(handleFormInputs(["startTime", parseInt(clickedElement.id)]))
        dispatch(handleFormInputs(["endTime", parseInt(clickedElement.id) + 3600000]))
        dispatch(handleFormInputs(["allDay", view === "Month" ? true : false]))
        dispatch(handleFormInputs(["startDate", parseInt(clickedElement.id)]))
        dispatch(handleFormInputs(["endDate", parseInt(clickedElement.id)]))
    }, [])

    const [eventData, dispatchReducer] = useReducer(reducer, {
        uuid: 'id' + new Date().getTime(),
        title: "",
        type: clickedElement.type ? clickedElement.type : "form-event",
        createdAt: parseInt(Date.parse(new Date())),
        startTime: parseInt(clickedElement.id),
        endTime: parseInt(clickedElement.id) + 3600000,
        allDay: view === "Month" ? true : false,
        startDate: parseInt(clickedElement.id),
        endDate: parseInt(clickedElement.id),
        guests: [],
        location: "",
        description: "",
        attachment: [],
        color: "#039be5",
        notifications: []
    });

    function startDrag(event) {
        dragControls.start(event);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!eventData.title) return;
        dispatch(postData(eventData));
        dispatch(addTask(eventData));
        onClose();
    }

    useEffect(() => {
        calcModalPosition(clickedElement, setModalPosition);
    }, [clickedElement])

    const handleScroll = (e) => {
        if (e.target.scrollTop == 0) {
            setBottomBorder(false);
        } else setBottomBorder(true);
    }
    
    return (
        <>
            {createPortal(<div className="overlay" onClick={onClose}></div>,document.body)}
            <EventDataContext.Provider value={eventData}>
                <EventChangeContext.Provider value={dispatchReducer}>
                    {createPortal(<motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{opacity: 0}}
                        transition={{ duration: 0.1 }}
                        dragControls={dragControls}
                        dragConstraints={dragBorder}
                        dragElastic={0}
                        drag
                        dragListener={false}
                        dragMomentum={false}
                        className="event-add"
                        style={{
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                        }}>
                        <FormDock onClose={onClose} startDrag={startDrag}/>
                        <form onSubmit={handleSubmit} className="form" id="my-form" onScroll={(e) => handleScroll(e)}>
                                        <div className="form-grid">
                                            <InputTitle/>
                                            <EventType/>
                                        </div>
                        </form>
                        <FormFooter bottomBorder={bottomBorder}/>
                    </motion.div>, document.body)}
                </EventChangeContext.Provider>
            </EventDataContext.Provider>
        </>
    )
}

function reducer(state, action) {
    switch (action.type) {
        case 'title': {
            return {
                ...state,
                title: action.payload
            }
        }
        case 'type': {
            return {
                ...state,
                type: action.payload
            }
        }
        case 'startTime': {
            return {
                ...state,
                startTime: Date.parse(action.payload),
                endTime: timeMatch(action.payload, state.endTime)
            }
        }
        case 'endTime': {
            return {
                ...state,
                endTime: Date.parse(action.payload)
            }
        }
        case 'allDay': {
            return {
                ...state,
                allDay: action.payload
            }
        }
        case 'startDate': {
            return {
                ...state,
                startDate: Date.parse(action.payload),
                endDate: Date.parse(startDateMatch(action.payload, state.endDate))
            }
        }
        case 'endDate': {
            return {
                ...state,
                startDate: Date.parse(endDateMatch(action.payload, state.startDate)),
                endDate: Date.parse(action.payload)
            }
        }
        case 'guests': {
            return {
                ...state,
                guests: action.payload
            }
        }
        case 'location': {
            return {
                ...state,
                location: action.payload
            }
        }
        case 'description': {
            return {
                ...state,
                description: action.payload
            }
        }
        case 'color': {
            return {
                ...state,
                color: action.payload
            }
        }
        case 'notifications': {
            return {
                ...state,
                notifications: action.payload
            }
        }
    }
}