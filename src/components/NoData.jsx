import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

export default function NoData({ message }) {
  let style = {
    minHeight: "20vh",
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={style}
    >
      <FontAwesomeIcon icon={faFaceFrown} />
      <p className="text-muted text-center text-capitalize">{message}</p>
    </div>
  );
}
