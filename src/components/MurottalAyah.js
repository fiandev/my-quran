import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { Component }  from 'react'
import { faVolumeUp,  faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { playMurottal } from '../core/functions'
class MurottalAyah extends Component {
  state = {
    played: false
  }
  
  render () {
    return (
      <div 
      className="d-flex dl-btn justify-content-center align-items-center px-3 py-1"
      onClick={ (e) => { 
        playMurottal(this.props.audio, this.props.ayahNumber);
        this.setState({
          played: this.state.played ? false : true
        })
      } }>
        <FontAwesomeIcon icon={ this.state.played ? faVolumeDown : faVolumeUp } />
      </div>
    )
  }
}

export default MurottalAyah