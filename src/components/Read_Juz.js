import { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBookmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Cookies from 'js-cookie' 
import Ayah_In_Juz from './Ayah_In_Juz'
import { bookmark, deleteBookmark, hasBookmarked } from '../core/functions'
const Read_Juz = (props) => {
  const { juzid } = useParams()
  let [juz, setJuz] = useState([])
  //;https://quran-api-32ouuhnph-renomureza.vercel.app/surahs/1/ayahs/1
  useEffect(() => {
    if (juz.length > 1) return false
    axios.get(`https://quran-6g54mk0s9-gadingnst.vercel.app/juz/${juzid}`)
    .then(result => {
      setJuz(result.data)
    })
    .catch(e => {
      console.log(e);
    })
  })
  
  return (
      <div id="quran" className="container">
        <header className="d-flex bg-light fixed-top align-items-center justify-content-between px-3 py-2 text-uppercase">
              <div 
              className="d-flex justify-content-start"
              >
                <a 
                href="/home"
                className="d-flex gap-2 align-items-center text-decoration-none text-auto">
                 <FontAwesomeIcon icon={ faArrowLeft } />
                 my quran
                </a>
              </div>
            {
              hasBookmarked(juzid) 
              ?
                 <div
                  onClick={ (e) => deleteBookmark(juzid, e) }
                  className="d-flex justify-content-center align-items-center marked p-1"
                 >
                  <FontAwesomeIcon icon={ faBookmark } />
                 </div>
               :
                 <div
                  onClick={ (e) => bookmark({
                    juzid: juzid,
                    ayah: 1
                  } ,e) }
                  className="d-flex justify-content-center align-items-center p-1 un-marked"
                 >
                  <FontAwesomeIcon icon={ faBookmark } />
                 </div>
            }
           
          </header>
          
          {
            juz.data !== undefined ?
              <div 
              className="pages d-flex flex-column gap-2"
              >
                <div 
                className="header-surah m-0 p-0 text-center"
                >
                <p>
                  { `juz ${juzid}` }
                </p>
                </div>
                {
                    juz.data.verses.map((ayah) => {
                      return <Ayah_In_Juz
                      key={ ayah.number.inSurah }
                      ayah={ ayah } 
                      />
                    })
                }
              </div>
            :
              <div 
              className="pages"
              >
                <div 
                className="header-surah text-center"
                >
                <p>
                  { `juz ${juzid} not found!` }
                </p>
                </div>
              </div>
          }
      </div>
    )
}
export default Read_Juz
