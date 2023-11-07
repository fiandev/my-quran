import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faVolumeUp, faVolumeDown } from "@fortawesome/free-solid-svg-icons";
// import { playMurottal, stopMurrotal } from '../core/functions';

const MurottalAyah = ({ source, ayahNumber }) => {
  const [played, setPlayed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audio, setAudio] = useState(null);

  const playMurottal = async (source) => {
    await setAudio(new Audio(source));

    audio.onended = () => {
      alert("ended");
      setPlayed(false);
    };

    audio.onpaused = () => setPaused(true);
    audio.onplayed = () => alert("played");
    audio.play();
  };

  const pauseMurrotal = () => {
    if (played && audio) {
      audio.pause();
      setPlayed(false);
    }
  };

  const changeState = () => {
    if (!played && !paused) {
      playMurottal(source);
      setPlayed(true);
    } else {
      pauseMurrotal();
    }
  };

  return (
    <div
      className="d-flex dl-btn justify-content-center align-items-center px-3 py-1"
      onClick={changeState}
    >
      <FontAwesomeIcon icon={played ? faVolumeDown : faVolumeUp} />
    </div>
  );
};

export default MurottalAyah;
