/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './../../styles/taskSidebar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { allTasks } from '../../redux/features/taskSlicer';
import getData from '../../redux/features/thunk/getData';

export const TaskSidebar = ({burgerOpen}) => {
    const fetchedData = useSelector(allTasks);
    const [serverData, setServerData] = useState(fetchedData)
    const dispatch = useDispatch();
     useEffect(() => {
    dispatch(getData());
    setServerData(fetchedData)
    }, [burgerOpen])
    return (
        <div className={burgerOpen ? 'open sidebar' : 'closed sidebar'}>
            <ul className='taskList'>
                {serverData.data.map(user => {
                    return(
                        <li key={user.id}>{user.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}