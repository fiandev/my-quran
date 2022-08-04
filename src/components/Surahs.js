import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import List from './List'

class Surahs extends Component {
  state = {
    surahs: []
  }
  getData = () => {
    axios.get("https://quran-api-32ouuhnph-renomureza.vercel.app/surahs")
    .then(result => {
      this.setState({
        surahs: result.data
      })
    })
    .catch(e => console.log(e))
  }
  componentDidMount() {
    this.getData()
  }
  render () {
    return (
        <section id="surah">
          <div className="d-flex flex-column gap-1">
          {
           this.state.surahs.length > 0 ?
            this.state.surahs.map(surah => {
             return <List 
              key={ surah.number } 
              number={ `${surah.number.toString().length < 2 ? "0" + surah.number : surah.number}` }
              title={ surah.name }
              revelation={ surah.revelation }
              ayah={ `${surah.numberOfAyahs} ayat` }
              download={ surah.audio }
              slug={ "surah" }
             />
            })
            : "loading"
          }
          </div>
        </section>
      )
  }
}
export default Surahs