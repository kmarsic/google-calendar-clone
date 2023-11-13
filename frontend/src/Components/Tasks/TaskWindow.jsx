import './../../styles/taskAddWindow.scss'
import { NewTaskForm } from './NewTaskForm';

export const TaskWindow = () => {

    return (
        <div className="event-add">
            <NewTaskForm/>
            <ul>
                <li>task</li>
                <li>event</li>
                <li>schedule</li>
                <li>appointment</li>
            </ul>
        </div>
    )
}