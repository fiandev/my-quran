import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faVolumeUp,  faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { playMurottal } from '../core/functions'

const handler = (e, cond) => {
  if (!cond) {
    e.target.innerHTML = faVolumeUp
  }
}
const MurottalAyah = (props) => {
  return (
      <div 
      className="d-flex dl-btn justify-content-center align-items-center px-3 py-1"
      onClick={ (e) => { playMurottal(props.audio, props.ayahNumber) } }>
        <FontAwesomeIcon icon={ faVolumeUp } />
      </div>
    )
}

export default MurottalAyah