import { Component } from 'react'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faArrowDown, faPlay } from '@fortawesome/free-solid-svg-icons'
import { pageScroll } from '../core/functions'
class Scrolldown extends Component {
  state = {
    active: false
  }
  
  render () {
    return (
       <div className="d-flex align-items-center justify-content-center">
         {
           !this.state.active
            ?
               <div
                onClick={ (e) => {
                   pageScroll(true);
                   this.setState({
                     active: true
                   });
                 }
                }
                className="d-flex justify-content-center align-items-center marked p-1"
               >
                <FontAwesomeIcon icon={ faArrowDown } />
               </div>
             :
               <div
                onClick={ (e) => {
                  pageScroll(false);
                  this.setState({
                     active: false
                   });
                  }
                }
                className="d-flex justify-content-center align-items-center p-1 un-marked"
               >
                <FontAwesomeIcon icon={ faPlay } />
               </div>
         }
        </div>
      )
  }
}
export default Scrolldown