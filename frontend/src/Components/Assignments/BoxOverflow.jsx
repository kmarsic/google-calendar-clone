import { useSelector } from "react-redux";
import { Task } from "./Task"
import { allTasks } from "../../redux/features/taskSlicer";

export function BoxOverflow({date, setModalVisible}) {
    const list = useSelector(allTasks);
    const filtered = list.filter((task) => {
        return task.startDate == date
    })
    const mappedList = filtered.map((task,index) => {
        if (index >= 3) {
            return
        } else return <Task key={index} task={task}/>
    })
    return (
        <>
            {mappedList}
            <div onClick={() => setModalVisible(true)} className="assignment-overflow">{mappedList.length - 3} more <br className="break"/></div>
        </>
    )
}