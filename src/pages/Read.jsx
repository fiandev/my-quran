import { Component, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import Ayah from "../components/Ayah";
import Scrolldown from "../components/Scrolldown";
import Mark from "../components/Mark";
import {
  getDataOnCookie,
  setDataOnCookie,
  bookmark,
  deleteBookmark,
  hasBookmarked,
  generateKey,
} from "../core/functions";
import ToggleTheme from "../partials/ToggleTheme";

const Read = () => {
  const { surahid } = useParams();
  const cookieKey = `data-surah-${surahid}`;
  let [surah, setSurah] = useState(getDataOnCookie(cookieKey) || []);
  let [hasBookmark, setHasBookmark] = useState(
    surah ? hasBookmarked(surah.number) : hasBookmarked("00"),
  );

  useEffect(() => {
    axios
      .get(
        `https://quran-api-32ouuhnph-renomureza.vercel.app/surahs/${surahid}`,
      )
      .then((result) => {
        let surah = result.data;
        surah.number = `${
          surah.number.toString().length < 2 ? "0" + surah.number : surah.number
        }`;

        setDataOnCookie(cookieKey, surah);
        setSurah(surah);
      })
      .catch((e) => {
        setSurah("404");
        console.log(`${surahid} not found!`);
      });
  }, []);

  return (
    <div id="quran" className="container">
      <header className="d-flex fixed-top align-items-center justify-content-between px-3 py-2 text-uppercase">
        <div className="d-flex justify-content-start">
          <Link
            to="/alquran"
            className="d-flex gap-2 align-items-center text-decoration-none text-auto"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {surah !== "404" ? surah.name : "My Qur'an"}
          </Link>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <Scrolldown key={() => generateKey()} />
          {surah !== "404" ? <Mark key={surah.number} id={surah.number} /> : ""}
          <ToggleTheme />
        </div>
      </header>
      {surah !== "404" ? (
        surah.ayahs ? (
          <div className="pages d-flex flex-column gap-2">
            <div className="header-surah m-0 p-0 text-center">
              <p>{`${surah.name} (${surah.translation})`}</p>
            </div>
            {surah.ayahs.map((ayah) => {
              return <Ayah key={ayah.number} ayah={ayah} />;
            })}
          </div>
        ) : (
          <div className="pages">
            <div className="header-surah text-center">
              <p>{`memuat surah ...`}</p>
            </div>
          </div>
        )
      ) : (
        <div className="pages">
          <div className="header-surah text-center">
            <p className="m-0 p-0 text-capitalize">
              {`surah ke ${surahid} tidak ditemukan`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Read;
