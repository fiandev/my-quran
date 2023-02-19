import { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.svg'
import "./Styles.css"
import "./App.css"
import Home from './pages/Home'
import Quran from './pages/Quran'
import Read from './pages/Read'
import Read_Juz from './pages/Read_Juz'
import Schedule from './pages/Schedule'

class App extends Component {
  render () {
    return (
      <Router>
       <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/alquran" element={ <Quran /> } />
        <Route path="/schedule" element={ <Schedule /> } />
        <Route path="/surah/:surahid" element={ <Read /> } />
        <Route path="/juz/:juzid" element={ <Read_Juz /> } />
        <Route path="*" element={ <Home /> } />
       </Routes>
      </Router>
      )
  }
}
export default App;
