import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";

import List from "./List";
import BookmarkEmpty from "./BookmarkEmpty";

class Bookmark extends Component {
  state = {
    bookmark: [],
    surahs: [],
  };
  getData = () => {
    let data = Cookies.get("bookmark")
      ? JSON.parse(Cookies.get("bookmark"))
      : [];
    this.setState({
      bookmark: data,
    });

    axios
      .get("https://quran-api-32ouuhnph-renomureza.vercel.app/surahs")
      .then((result) => {
        this.setState({
          surahs: result.data,
        });
      })
      .catch((e) => console.log(e));
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <section id="bookmark">
        <div className="d-flex flex-column gap-2">
          {this.state.surahs.length > 0 ? (
            this.state.bookmark.length > 0 ? (
              this.state.bookmark.map((data) => {
                return (
                  <List
                    key={
                      this.state.surahs[
                        this.state.surahs.findIndex(
                          (surah) => surah.number == data.surahid,
                        )
                      ].number
                    }
                    number={
                      this.state.surahs[
                        this.state.surahs.findIndex(
                          (surah) => surah.number == data.surahid,
                        )
                      ].number
                    }
                    title={
                      this.state.surahs[
                        this.state.surahs.findIndex(
                          (surah) => surah.number == data.surahid,
                        )
                      ].name
                    }
                    revelation={
                      this.state.surahs[
                        this.state.surahs.findIndex(
                          (surah) => surah.number == data.surahid,
                        )
                      ].revelation
                    }
                    ayah={`${
                      this.state.surahs[
                        this.state.surahs.findIndex(
                          (surah) => surah.number == data.surahid,
                        )
                      ].numberOfAyahs
                    } ayat`}
                    download={
                      this.state.surahs[
                        this.state.surahs.findIndex(
                          (surah) => surah.number == data.surahid,
                        )
                      ].audio
                    }
                    slug={"surah"}
                  />
                );
              })
            ) : (
              <BookmarkEmpty />
            )
          ) : (
            "loading"
          )}
        </div>
      </section>
    );
  }
}
export default Bookmark;
