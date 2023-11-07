import { Component } from "react";

import Subtitle from "./Subtitle";
import MurottalAyah from "./MurottalAyah";

class Ayah extends Component {
  state = {
    translate: this.props.ayah.translation,
    tafsir: this.props.ayah.tafsir.kemenag.short,
    tafsirOpen: false,
  };
  showTafsir = (e) => {
    let text = e.target.innerHTML;
    this.setState({
      tafsirOpen: !this.state.tafsirOpen,
    });
    e.target.innerHTML =
      text === this.state.translate
        ? "Tafsir : <br/>" + this.state.tafsir
        : this.state.translate;
  };

  render() {
    return (
      <div className="ayah-container">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-start gap-2">
            <div className="d-flex icon-number justify-content-center align-items-center rounded-circle">
              {`${
                this.props.ayah.number.inSurah.toString().length < 2
                  ? "0" + this.props.ayah.number.inSurah
                  : this.props.ayah.number.inSurah
              }`}
            </div>
            <MurottalAyah
              source={this.props.ayah.audio.alafasy}
              ayahNumber={this.props.ayah.number.inSurah}
              key={this.props.ayah.audio.alafasy}
            />
          </div>
          <div
            className={`list-link ${
              this.state.tafsirOpen ? "tafsir-open" : ""
            } ayah d-flex flex-column justify-content-center`}
          >
            <h1 className="arabic text-end">{this.props.ayah.arab}</h1>
            <p
              className="translate m-0 p-0 text-start"
              onClick={this.showTafsir}
            >
              {this.props.ayah.translation}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Ayah;
