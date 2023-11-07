import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDataOnCookie, setDataOnCookie } from "../core/functions";
import axios from "axios";

import List from "./List";

export default function Surahs() {
  let cookieKey = "data-surahs";
  let [Surahs, setSurahs] = useState(getDataOnCookie(cookieKey) || null);

  useEffect(() => {
    axios
      .get("https://quran-api-32ouuhnph-renomureza.vercel.app/surahs")
      .then((result) => {
        setSurahs(result.data);
        setDataOnCookie(cookieKey, result.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <section id="surah">
      <div className="d-flex flex-column gap-1">
        {Surahs
          ? Surahs.map((surah) => {
              return (
                <List
                  key={surah.number}
                  number={`${
                    surah.number.toString().length < 2
                      ? "0" + surah.number
                      : surah.number
                  }`}
                  title={surah.name}
                  revelation={surah.revelation}
                  ayah={`${surah.numberOfAyahs} ayat`}
                  download={surah.audio}
                  slug={"surah"}
                />
              );
            })
          : "loading"}
      </div>
    </section>
  );
}
