import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import ListSchedule from "../components/ListSchedule";
import NoData from "../components/NoData";

// import { getDateNow } from "../core/functions";

const Schedule = () => {
  let [coordinate, setCoordinate] = useState(null);
  let [cityName, setCityName] = useState(null);
  let [cityCode, setCityCode] = useState(null);
  let [cities, setCities] = useState(null);
  let [schedules, setSchedules] = useState(null);
  let [dateNow, setDateNow] = useState(new Date());

  const apikey = "96da74fb062e48809fc5f2871efb7ca1";

  const getCoordinate = async () => {
    if (!navigator.geolocation) return false;
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.log(err),
    );
  };

  const getCityCode = (name) => {
    for (let city of cities) {
      if (city.nama.toUpperCase() === name.toUpperCase()) return city.id;
    }
  };

  const changeDateNow = (e) => {
    let res = new Date(e.target.value) || new Date();
    setDateNow(res);
    console.log({ dateNow, res });
  };

  const changeCityCode = (e) => {
    let id = e.target.value;
    setCityCode(id);
    for (let city of cities) {
      if (city.id === id) {
        setCityName(city.nama);
      }
    }
  };

  useEffect(() => {
    if (!coordinate) return;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coordinate.latitude}+${coordinate.longitude}&key=${apikey}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) setCityName(null);
        setCityName(data.results[0]["components"]["county"]);
      });
  }, [coordinate]);

  useEffect(() => {
    // mendapatkan kode kota untuk api sholat
    if (!cityName) return;
    let code = getCityCode(cityName);
    setCityCode(code);
  }, [cityName]);

  useEffect(() => {
    //getCoordinate();
    fetch("https://api.banghasan.com/sholat/kota/semua/format/json?format=json")
      .then((res) => res.json())
      .then((data) => {
        setCities(data.kota);
      });
  }, []);

  useEffect(() => {
    if (!cityName || !dateNow) return;

    fetch(
      `https://api.aladhan.com/v1/calendarByAddress/${dateNow.getFullYear()}/${(
        dateNow.getMonth() + 1
      )
        .toString()
        .padStart(2)}?address=${cityName}&method=2}`,
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json || json.status.toLowerCase() !== "ok") return;
        let date = dateNow.getDate();
        let data = json.data[date - 1];
        console.log(data);
        let result = {
          date: "",
          data: [],
        };
        if (typeof data !== "object") {
          result["data"] = [];
        } else {
          result.date = data.date.readable;
          for (let key in data.timings) {
            result["data"].push({
              description: key,
              time: data.timings[key],
            });
          }
        }

        setSchedules(result);
        console.log(schedules);
      });
  }, [cityName, dateNow]);

  useEffect(() => {}, [schedules]);

  const btnGetLocationStyle = {
    fontSize: ".4rem",
  };

  return (
    <div>
      <header className="w-100 py-2 d-flex flex-column bg-light flex-column justify-content-between">
        <div className="d-flex mx-2 justify-content-between">
          <Link
            to="/"
            className="d-flex justify-content-center align-items-center text-decoration-none gap-2 text-uppercase"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            my quran
          </Link>

          <div className="d-flex align-items-center gap-2">
            <label
              htmlFor="date"
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <FontAwesomeIcon className="text-primary" icon={faCalendar} />
              <span style={btnGetLocationStyle} className="">
                set date
              </span>
            </label>

            <input
              onChange={(e) => changeDateNow(e)}
              id="date"
              type="date"
              className="absolute"
              style={{ zIndex: -1, width: 0 }}
            />

            <div
              onClick={getCoordinate}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <FontAwesomeIcon className="text-primary" icon={faLocationDot} />
              <span style={btnGetLocationStyle} className="">
                get location
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="row mx-2">
        <div className="col my-2">
          <label className="text-dark text-capitalize"> pilih lokasi </label>
          <select onChange={(e) => changeCityCode(e)} className="form-select">
            <option value="">-- pilih lokasi --</option>
            {cities
              ? cities.map((city) => {
                  if (city.id === cityCode)
                    return (
                      <option selected data-city={city.nama} value={city.id}>
                        {city.nama}
                      </option>
                    );
                  else
                    return (
                      <option data-city={city.nama} value={city.id}>
                        {city.nama}
                      </option>
                    );
                })
              : ""}
          </select>
        </div>

        <div className="px-2">
          {schedules ? (
            <p className="text-muted m-0">tanggal : {schedules.date}</p>
          ) : (
            ""
          )}
          <div className="d-flex flex-column gap-2">
            {schedules ? (
              schedules.data.length < 1 ? (
                <NoData message="maaf, data jadwal sholat hari ini belum terupdate!" />
              ) : (
                schedules.data.map((schedule) => {
                  return (
                    <ListSchedule
                      description={schedule.description}
                      time={schedule.time}
                    />
                  );
                })
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
