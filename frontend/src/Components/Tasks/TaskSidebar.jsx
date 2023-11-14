/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import './../../styles/taskSidebar.scss'
import { useSelector } from 'react-redux';
import { allTasks } from '../../redux/features/taskSlicer';

export const TaskSidebar = ({burgerOpen}) => {
    const fetchedData = useSelector(allTasks);
    return (
        <div className={burgerOpen ? 'open sidebar' : 'closed sidebar'}>
            <ul className='taskList'>
                {fetchedData.data.map(user => {
                    return(
                        <li key={user._id}>{user.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}