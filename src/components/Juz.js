import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import List from './List'


class Juz extends Component {
  state = {
    juz: []
  }
  getData = () => {
    /* juz seeding */
    /*
    let juz = []
    for (var i = 1; i <= 30; i++) {
      juz.push({
        number: i
      })
    }
    this.setState({
      juz: juz
    })
    */
    axios.get("https://raw.githubusercontent.com/semarketir/quranjson/master/source/juz.json")
    .then(result => {
      this.setState({
        juz: result.data
      })
    })
    .catch(e => console.log(e))
  }
  componentDidMount() {
    this.getData()
  }
  render () {
    return (
        <section id="juz">
          <div className="d-flex flex-column gap-2">
          {
           this.state.juz.length > 0 ?
            this.state.juz.map(j => {
             return <List 
              key={j.index} 
              number={j.index.toString().slice(-1)}
              title={ "juz " + j.index }
              slug={ "juz" }
              revelation={ `${j.start.name} ayat ${ j.start.verse.split("verse_").join("") }` }
              ayah={ `${j.end.name} ayat ${ j.end.verse.split("verse_").join("") }` }
             />
            })
            : "loading"
          }
          </div>
        </section>
      )
  }
}
export default Juz