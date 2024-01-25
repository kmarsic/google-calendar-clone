/* eslint-disable react/prop-types */
//styles
import "./../../styles/_index.scss";
//components
import { EventForm } from "./EventForm";
import { TaskForm } from "./TaskForm";
import { faGripLines, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//dependencies
import { useState } from "react";
import { useDispatch } from "react-redux";
import postData from "../../redux/features/thunk/postData";
import { addTask } from "../../redux/features/taskSlicer";
import { motion } from "framer-motion";

export function NewTaskForm({ clickedElement, onClose }) {
    const dispatch = useDispatch();

    const [formType, setFormType] = useState(true);
    const [color, setColor] = useState("#039be5");

    const handleColor = (e) => {
        setColor(e.target.value);
    };

    const [formData, setFormData] = useState({
        list: "My Tasks",
        ID: crypto.randomUUID(),
        name: clickedElement.id,
        type: "task",
        updatedAt: "",
        createdAt: Date.parse(new Date()),
        startTime: Date.parse(clickedElement.date),
        location: "",
        description: "",
        color: color,
        title: "",
        completed: false,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title) return;
        dispatch(postData(formData));
        dispatch(addTask(formData));

        setFormData({
            ...formData,
            ID: crypto.randomUUID(),
            updatedAt: "",
            location: "",
            description: "",
            color: color,
            title: "",
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            drag="x"
            className="event-add"
            style={{
                top: `${clickedElement.cursorY}px`,
                left: `${clickedElement.cursorX}px`,
            }}
        >
            <div className="form-dock">
                <FontAwesomeIcon
                    icon={faGripLines}
                    color="rgb(139, 143, 147)"
                    size="xl"
                />
                <FontAwesomeIcon
                    onClick={() => onClose()}
                    cursor={"pointer"}
                    icon={faXmark}
                    size="xl"
                />
            </div>
            <form onSubmit={handleSubmit} className="form">
                    <motion.input
                        type="text"
                        id="form-title"
                        name="title"
                        autoFocus
                        initial={{ outline: "none" }}
                        required
                        placeholder="Add title"
                        value={formData.title}
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e)}
                    />
                <div className="event-type">
                    <button
                        id="event"
                        onClick={(e) => {e.preventDefault(); setFormType(true)}}
                    >Event</button>
                    <button
                        id="task"
                        onClick={(e) => {e.preventDefault();setFormType(false)}}
                    >Task</button>
                    <button style={{ display: "none" }}></button>
                </div>

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
                <button
                onClick={(e) => e.preventDefault()}>
                    More options
                </button>
                <button type="submit">Save</button>
            </form>
        </motion.div>
    );
}
