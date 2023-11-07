import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
const BookmarkEmpty = (props) => {
  return (
      <div className="d-flex justify-content-center align-items-center flex-column bookmark-empty">
        <FontAwesomeIcon icon={ faSmile } />
        <p className="m-0 p-0 text-center text-capitalize">
          surah yang anda tandai akan muncul disini
        </p>
      </div>
    )
}

export default BookmarkEmpty