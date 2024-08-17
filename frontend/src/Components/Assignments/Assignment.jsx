/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { allTasks } from "../../redux/features/taskSlicer";
import { useEffect, useState } from "react";
import { OverflowModal } from "./OverflowModal";
import { BoxOverflow } from "./BoxOverflow";
import { MonthTask } from "./MonthTask";

export function Assignment({date}) {
    const assignments = useSelector(allTasks);
    const [overflowVisible, setOverflowVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    function mapAssignments(list) {
        const filtered = list.filter((task) => {
            return (
                task.startDate == date || task.endDate == date
            )
        })
        const mapped = filtered.map((task, index) => {
            return <MonthTask key={index} task={task}/>
        })
        return mapped
    }

    useEffect(() => {
        const filtered = assignments.filter((task) => {
            return task.startDate == date
        })
        if (filtered.length < 3) {
            setOverflowVisible(false);
        } else if (filtered.length > 3) {
            setOverflowVisible(true)
        }
    }, [assignments])

    return (
        <>
            {overflowVisible ? 
            <BoxOverflow date={date} setOverflowVisible={setOverflowVisible} setModalVisible={setModalVisible}/> 
            : 
            mapAssignments(assignments)}
            {modalVisible ? 
            <OverflowModal setModalVisible={setModalVisible} date={date}/> 
            : null}
        </>
    )
}