/* eslint-disable react/prop-types */
//styles
import "./../../styles/_index.scss";
//dependencies
import { motion, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AttachmentContext, AttachmentChangeContext } from "./formContext";
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
    const view = useSelector(currentView);
    const form = useSelector(formData);
    const dragControls = useDragControls();

    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [bottomBorder, setBottomBorder] = useState(false);
    const [attachment, setAttachment] = useState([]); //send attachment to backend via post

    useEffect(() => {
        dispatch(handleFormInputs({type: "endTime", payload: timeMatch(form.startTime, form.endTime)}))
    }, [form.startTime])

    useEffect(() => {
        dispatch(handleFormInputs({type: "endDate", payload: startDateMatch(form.startDate, form.endDate)}))
    }, [form.startDate])
    
    useEffect(() => {
        dispatch(handleFormInputs({type: "startDate", payload: endDateMatch(form.endDate, form.startDate)}))
    }, [form.endDate])

    //initialize empty state
    useEffect(() => {
        dispatch(handleFormInputs({type: "title", payload: ""}));
        dispatch(handleFormInputs({type: "uuid", payload: 'id' + new Date().getTime()}));
        dispatch(handleFormInputs({type: "type", payload: clickedElement.type ? clickedElement.type : "form-event"}));
        dispatch(handleFormInputs({type: "createdAt", payload: parseInt(Date.parse(new Date()))}))
        dispatch(handleFormInputs({type: "startTime", payload: parseInt(clickedElement.id)}));
        dispatch(handleFormInputs({type: "endTime", payload: parseInt(clickedElement.id) + 3600000}));
        dispatch(handleFormInputs({type: "allDay", payload: view === "Month" ? true : false}))
        dispatch(handleFormInputs({type: "startDate", payload: parseInt(clickedElement.id)}));
        dispatch(handleFormInputs({type: "endDate", payload: parseInt(clickedElement.id)}));
        dispatch(handleFormInputs({type: "guests", payload: []}));
        dispatch(handleFormInputs({type: "location", payload: ""}));
        dispatch(handleFormInputs({type: "description", payload: ""}));
        dispatch(handleFormInputs({type: "attachment", payload: []}));
        dispatch(handleFormInputs({type: "color", payload: "#039be5"}));
        dispatch(handleFormInputs({type: "notifications", payload: []}))
    }, [])

    function startDrag(event) {
        dragControls.start(event);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.title) return;
        dispatch(postData(form));
        dispatch(addTask(form));
        onClose();
    }

    useEffect(() => {
        calcModalPosition(clickedElement, setModalPosition, view);
    }, [clickedElement])

    const handleScroll = (e) => {
        if (e.target.scrollTop == 0) {
            setBottomBorder(false);
        } else setBottomBorder(true);
    }
    
    return (
        <>
            {createPortal(<div className="overlay" onClick={onClose}></div>,document.body)}
            <AttachmentContext.Provider value={attachment}>
                <AttachmentChangeContext.Provider value={setAttachment}>
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
                </AttachmentChangeContext.Provider>
            </AttachmentContext.Provider>
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