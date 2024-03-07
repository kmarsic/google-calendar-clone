/* eslint-disable react/prop-types */
//styles
import "./../../styles/_index.scss";
//dependencies
import { motion, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormDataContext, FormDataChangeContext, FormDataGuestsContext } from "./formContext";
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

    const [formData, setFormData] = useState({
        list: "Events",
        name: clickedElement.id,
        type: "Event",
        title: "",
        updatedAt: "",
        createdAt: Date.parse(new Date()),
        startTime: inputTimeFormat(new Date(parseInt(clickedElement.id))),
        endTime: inputTimeFormat(new Date(parseInt(clickedElement.id))),
        guests: [],
        location: "",
        description: "",
        color: "#039be5",
        completed: false,
    });

    function startDrag(event) {
        dragControls.start(event);
    }

    function handleGuestChange(list) {
        setFormData({
            ...formData,
            guests: list
        });
    }

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title) return;
        dispatch(postData(formData));
        dispatch(addTask(formData));
        onClose();
    }

    useEffect(() => {
        calcModalPosition(clickedElement, setModalPosition);
    }, [clickedElement])

    return (
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
                <FormDataContext.Provider value={formData}>
                    <FormDataChangeContext.Provider value={handleInputChange}>
                        <FormDataGuestsContext.Provider value={handleGuestChange}>
                            <div className="form-grid">
                                <InputTitle handleInputChange={handleInputChange} formData={formData}/>
                                <EventType setFormType={setFormType}/>
                                {formType == true ? (
                                    <EventForm/>
                                ) : (
                                    <TaskForm
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                    />
                                )}
                            </div>
                        </FormDataGuestsContext.Provider>
                    </FormDataChangeContext.Provider>
                </FormDataContext.Provider>
                <FormFooter/>
            </form>
        </motion.div>
    );
}
