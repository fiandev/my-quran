import { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { hasBookmarked } from '../core/functions'
import Subtitle from './Subtitle'
import Download from './Download'
import Mark from './Mark'

class List extends Component {
  state = {
    hasBookmark: hasBookmarked(this.props.number)
  }
  render () {
    return (
        <div className="d-flex justify-content-between">
            <Link
              to={ 
                "/" + this.props.slug + "/" + this.props.number
              }
              className="list-link w-100 d-flex align-items-center "
            >
              <div className="d-flex py-2 detail align-items-center gap-2">
                  <div className="d-flex icon-number justify-content-center align-items-center rounded-circle">
                    { this.props.number.length < 2 ? "0" + this.props.number : this.props.number  }
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <h1 className="title">
                     {this.props.title}
                    </h1>
                    {
                      
                      this.props.revelation ?
                      <Subtitle 
                        ayah={this.props.ayah} 
                        revelation={this.props.revelation}
                        slug={ this.props.slug }
                      />
                      : ""
                    }
                  </div>
              </div>
          
            {
             this.props.download ?
             <Download
                download={ this.props.download }
                filename={ this.props.title }
              />
              : ""
            }
            </Link>
            <div className="d-flex align-items-center justify-content-center px-2">
            {
              this.props.slug !== "juz" ?
              <Mark 
                key={this.props.number} 
                id={this.props.number}
              />
              : ""
            }
          </div>
        </div>
      )
  }
}

export default List