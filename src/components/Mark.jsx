import { Component } from 'react'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { bookmark, deleteBookmark, hasBookmarked } from '../core/functions'

class Mark extends Component {
  state = {
    hasBookmark: hasBookmarked(this.props.id)
  }
  
  render () {
    return (
       <div className="d-flex align-items-center justify-content-center">
         {
           this.state.hasBookmark
            ?
               <div
                onClick={ (e) => {
                   deleteBookmark(this.props.id, e);
                   this.setState({
                     hasBookmark: false
                   });
                 }
                }
                className="d-flex justify-content-center align-items-center marked p-1"
               >
                <FontAwesomeIcon icon={ faBookmark } />
               </div>
             :
               <div
                onClick={ (e) => {
                  bookmark({
                    surahid: Number(this.props.id),
                    ayah: 1
                  } ,e);
                  this.setState({
                     hasBookmark: true
                   });
                  }
                }
                className="d-flex justify-content-center align-items-center p-1 un-marked"
               >
                <FontAwesomeIcon icon={ faBookmark } />
               </div>
         }
        </div>
      )
  }
}
export default Mark