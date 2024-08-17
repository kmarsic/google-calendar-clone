import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { allTasks } from "../../redux/features/taskSlicer";
import { setDate } from "../../redux/features/dateSlicer";
import { MonthTask } from "./MonthTask";

export function OverflowModal({ setModalVisible, date }) {
  const dispatch = useDispatch();
  const list = useSelector(allTasks);

  const day = new Date(date)
    .toLocaleString("default", { weekday: "short" })
    .toUpperCase();
  const newDate = new Date(date).getDate();

  const filtered = list.filter((task) => {
    return task.startDate == date;
  });
  const mapped = filtered.map((task, index) => {
    return <MonthTask key={index} task={task} />;
  });
  return (
    <>
      <div
        className="assignment-overflow-modal-overlay"
        onClick={() => setModalVisible(false)}
      ></div>
      <div className="assignment-overflow-modal">
        <div className="modal-div">
          <div>{day}</div>
          <div onClick={() => dispatch(setDate(date))}>
            <Link to={"/Day"}>
              <span>{newDate}</span>
            </Link>
          </div>
          <FontAwesomeIcon
            className="modal-exit"
            icon={faXmark}
            onClick={() => setModalVisible(false)}
          />
        </div>
        <div>{mapped.length > 0 ? mapped : "There are no events scheduled on this day."}</div>
      </div>
    </>
  );
}
