import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
const Download = (props) => {
  return (
       <a
        href={ props.download }
        target="_blank" 
        download={ props.filename }
       >
        <div className="d-flex dl-btn justify-content-center align-items-center px-5 py-2 rounded">
          <FontAwesomeIcon icon={ faCloudArrowDown } />
        </div>
      </a>
    )
}

export default Download