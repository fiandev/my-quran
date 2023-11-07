import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const ListSchedule = ({ description, time }) => {
  return (
    <div className="p-2 rounded d-flex border bordered align-items-center justify-content-between">
      <div className="d-flex gap-2 justify-content-start align-items-center">
        <FontAwesomeIcon icon={faClock} />
        <span className="text-secondary">{time}</span>
      </div>
      <p className="m-0 p-0 fw-bold bold text-dark">{description}</p>
    </div>
  );
};

export default ListSchedule;
