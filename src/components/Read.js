import { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBookmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Cookies from 'js-cookie' 
import Ayah from './Ayah'
import Scrolldown from './Scrolldown'
import { bookmark, deleteBookmark, hasBookmarked, generateKey } from '../core/functions'

const Read = (props) => {
  const { surahid } = useParams()
  let [surah, setSurah] = useState([])
  
  useEffect(() => {
    axios.get(`https://quran-api-32ouuhnph-renomureza.vercel.app/surahs/${surahid}`)
    .then(result => {
      setSurah( result.data )
    })
    .catch(e => {
      setSurah("404")
      console.log(`${surahid} not found!`);
    })
  }, [])
  
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
                 { surah !== "404" ? surah.name : "My Qur'an" }
                </a>
              </div>
              
              <div className="d-flex gap-2 align-items-center">
                <Scrolldown key={ () => generateKey() } />
                {
                surah !== "404" ?
                  hasBookmarked(surahid) 
                  ?
                     <div
                      onClick={ (e) => deleteBookmark(surahid, e) }
                      className="d-flex justify-content-center align-items-center marked p-1"
                     >
                      <FontAwesomeIcon icon={ faBookmark } />
                     </div>
                   :
                     <div
                      onClick={ (e) => bookmark({
                        surahid: surah.number,
                        ayah: 1
                      } ,e) }
                      className="d-flex justify-content-center align-items-center p-1 un-marked"
                     >
                      <FontAwesomeIcon icon={ faBookmark } />
                     </div>
                : ""
              }
              </div>
           
          </header>
          {
            surah !== "404" ?
              surah.ayahs ?
                <div 
                className="pages d-flex flex-column gap-2"
                >
                  <div 
                  className="header-surah m-0 p-0 text-center"
                  >
                  <p>
                    { `${surah.name} (${surah.translation})` }
                  </p>
                  </div>
                  {
                      surah.ayahs.map((ayah) => {
                        return <Ayah
                        key={ ayah.number }
                        ayah={ ayah } 
                        />
                      })
                  }
                </div>
                  : 
                    <div className="pages">
                      <div 
                      className="header-surah text-center"
                      >
                      <p>
                        { `memuat surah ...` }
                      </p>
                      </div>
                    </div>
              : 
              <div className="pages">
                <div 
                className="header-surah text-center"
                >
                <p className="m-0 p-0 text-capitalize">
                  { `surah ke ${surahid} tidak ditemukan` }
                </p>
                </div>
              </div>
          }
      </div>
    )
}
export default Read
