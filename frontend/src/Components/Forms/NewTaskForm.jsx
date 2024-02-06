/* eslint-disable react/prop-types */
//styles
import "./../../styles/_index.scss";
//dependencies
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import postData from "../../redux/features/thunk/postData";
import { addTask } from "../../redux/features/taskSlicer";
import { motion, useDragControls } from "framer-motion";
import { formTimeFormat, calcModalPosition } from "../../Fncs/indexFncs";
import { FormTitle } from "./Inputs/FormTitle";
import { FormFooter, EventType, FormDock, TaskForm, EventForm } from "./FormModules/indexFormModules"

export function NewTaskForm({ clickedElement, onClose }) {
    const dispatch = useDispatch();
    const dragControls = useDragControls();

    const [formType, setFormType] = useState(true);
    const [color, setColor] = useState("#039be5");
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [formData, setFormData] = useState({
        list: "My Tasks",
        name: clickedElement.id,
        type: "task",
        updatedAt: "",
        createdAt: Date.parse(new Date()),
        startTime: formTimeFormat(new Date(parseInt(clickedElement.id))),
        endTime: formTimeFormat(new Date(parseInt(clickedElement.id))),
        location: "",
        description: "",
        color: color,
        title: "",
        completed: false,
    });

    function startDrag(event) {
        dragControls.start(event);
    }

    function handleColor(e) {
        setColor(e.target.value);
    }

    function handleInputChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title) return;
        dispatch(postData(formData));
        dispatch(addTask(formData));
        setFormData({
            ...formData,
            updatedAt: "",
            location: "",
            description: "",
            color: color,
            title: "",
        });
    }

    useEffect(() => {
        calcModalPosition(clickedElement, setModalPosition);
    }, [clickedElement])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                <FormTitle handleInputChange={handleInputChange} formData={formData}/>
                <EventType setFormType={setFormType}/>

                {formType == true ? (
                    <EventForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        color={color}
                        handleColor={handleColor}
                    />
                ) : (
                    <TaskForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                )}
                <FormFooter/>
            </form>
        </motion.div>
    );
}
