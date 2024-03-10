/* eslint-disable react/prop-types */
//styles
import "./../../styles/_index.scss";
//dependencies
import { motion, useDragControls } from "framer-motion";
import { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { EventDataContext, EventChangeContext } from "./formContext";
//redux
import postData from "../../redux/features/thunk/postData";
import { addTask } from "../../redux/features/taskSlicer";
//components
import { calcModalPosition, inputTimeFormat } from "../../Fncs/indexFncs";
import { InputTitle } from "./Inputs/InputTitle";
import { FormFooter, EventType, FormDock, TaskForm, EventForm } from "./FormModules/indexFormModules"

export function NewTaskForm({ clickedElement, onClose }) {
    const dispatch = useDispatch();
    const dragControls = useDragControls();

    const [formType, setFormType] = useState(true);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});

    const [eventData, dispatchReducer] = useReducer(reducer, {
        name: clickedElement.id,
        title: "",
        updatedAt: "",
        createdAt: Date.parse(new Date()),
        startTime: inputTimeFormat(new Date(parseInt(clickedElement.id))),
        endTime: inputTimeFormat(new Date(parseInt(clickedElement.id))),
        guests: [],
        location: "",
        description: "",
        color: "#039be5",
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

    return (
        <EventDataContext.Provider value={eventData}>
            <EventChangeContext.Provider value={dispatchReducer}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{opacity: 0}}
                    transition={{ duration: 0.1 }}
                    dragControls={dragControls}
                    drag
                    dragListener={false}
                    dragMomentum={false}
                    className="event-add"
                    style={{
                        top: `${modalPosition.top}px`,
                        left: `${modalPosition.left}px`,
                    }}>
                    <FormDock onClose={onClose} startDrag={startDrag}/>
                    <form onSubmit={handleSubmit} className="form">
                                    <div className="form-grid">
                                        <InputTitle/>
                                        <EventType setFormType={setFormType}/>
                                        {formType == true ? (
                                            <EventForm/>
                                        ) : (
                                            <TaskForm/>
                                        )}
                                    </div>
                        <FormFooter/>
                    </form>
                </motion.div>
            </EventChangeContext.Provider>
        </EventDataContext.Provider>
    );
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
                startTime: inputTimeFormat(action.payload)
            }
        }
        case 'endTime': {
            return {
                ...state,
                endTime: inputTimeFormat(action.payload)
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
    }
}