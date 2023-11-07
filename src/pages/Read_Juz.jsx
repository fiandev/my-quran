import { Component, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import Ayah_In_Juz from "../components/Ayah_In_Juz";
import {
  bookmark,
  deleteBookmark,
  hasBookmarked,
  generateKey,
} from "../core/functions";

const Read_Juz = (props) => {
  const { juzid } = useParams();
  let [juz, setJuz] = useState([]);
  //;https://quran-api-32ouuhnph-renomureza.vercel.app/surahs/1/ayahs/1
  useEffect(() => {
    axios
      .get(`https://quran-6g54mk0s9-gadingnst.vercel.app/juz/${juzid}`)
      .then((result) => {
        setJuz(result.data.code === 200 ? result.data : "404");
        console.log(juz);
      })
      .catch((e) => {
        setJuz("404");
        console.log(e);
      });
  }, []);

  return (
    <div id="quran" className="container">
      <header className="d-flex bg-light fixed-top align-items-center justify-content-between px-3 py-2 text-uppercase">
        <div className="d-flex justify-content-start">
          <Link
            to="/home"
            className="d-flex gap-2 align-items-center text-decoration-none text-auto"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {juz !== "404" ? `juz ${juzid}` : "My Qur'an"}
          </Link>
        </div>
      </header>

      {juz !== "404" ? (
        juz.data ? (
          <div className="pages d-flex flex-column gap-2">
            <div className="header-surah m-0 p-0 text-center">
              <p>{`juz ${juzid}`}</p>
              <p>{`${juz.data.juzStartInfo} ~ ${juz.data.juzEndInfo}`}</p>
            </div>
            {juz.data.verses.map((ayah) => {
              return <Ayah_In_Juz key={generateKey()} ayah={ayah} />;
            })}
          </div>
        ) : (
          <div className="pages">
            <div className="header-surah text-center">
              <p>{`memuat juz ${juzid}`}</p>
            </div>
          </div>
        )
      ) : (
        <div className="pages">
          <div className="header-surah text-center">
            <p>{`juz ${juzid} not found!`}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Read_Juz;
