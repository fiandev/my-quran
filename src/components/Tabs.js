import { Component } from 'react'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'
import { changeTab } from '../core/functions'
import Cookies from 'js-cookie' 
import Surahs from './Surahs'
import Juz from './Juz'
import Bookmark from './Bookmark'

class Tabs extends Component {
  state = {
    tab: Cookies.get("tab-history") ? Number(Cookies.get("tab-history")) : 1
  }
  
  changePage = (tab) => {
    this.setState({
      tab: changeTab(tab)
    })
  }
  
  render () {
    return (
        <div id="quran" className="container">
        <header className="d-flex bg-light fixed-top flex-column justify-content-center">
            <div className="d-flex mx-2 justify-content-between"
            >
              <a
              href="/"
              className="d-flex justify-content-center align-items-center text-decoration-none gap-2 text-uppercase"
              >
               <FontAwesomeIcon icon={ faArrowLeft } />
               my quran
              </a>
            </div>
            <div id="tab" className="d-flex justify-content-center">
             <span 
             onClick={ () => this.changePage(1) } 
             className={ `tabs d-flex justify-content-center align-items-center" ${ this.state.tab === 1 ? "active" : "" }` }
             >
               surah
             </span>
             <span
             onClick={ () => this.changePage(2) }
             className={ `tabs d-flex justify-content-center align-items-center" ${ this.state.tab === 2 ? "active" : "" }` }
             >
               juz
             </span>
             <span
             onClick={ () => this.changePage(3) } 
             className={ `tabs d-flex justify-content-center align-items-center" ${ this.state.tab === 3 ? "active" : "" }` }
             >
               bookmark
             </span>
            </div>
          </header>
          
          <div className="pages d-flex">
            {
              this.state.tab === 1 ?
              <Surahs />
              : ""
            }
            {
              this.state.tab === 2 ?
              <Juz />
              : ""
            }
            {
              this.state.tab === 3 ?
              <Bookmark />
              : ""
            }
          </div>
        </div>
      )
  }
}
export default Tabs