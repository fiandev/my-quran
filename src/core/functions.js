import Cookies from 'js-cookie';

const audios = [];

export const playMurottal = async (source, ayahNumber) => {
  let newAudio = new Audio();
      newAudio.src = source;
      newAudio.play();
  
  audios.push({
    id: Number(ayahNumber),
    sound: newAudio
  });
  
  return newAudio;
}

export const stopMurrotal = (ayahNumber) => {
  for (let i = 0; i < audios.length; i++) {
    if (audios[i].id === Number(ayahNumber)) audios[i].sound.pause();
    else continue;
  }
}

export const bookmark = (data, e) => {
  if (!Cookies.get("bookmark")) {
    Cookies.set("bookmark", JSON.stringify([{
      surahid: data.surahid,
      ayah: data.ayah,
    }]));
  } else {
    let cookie = JSON.parse(Cookies.get("bookmark"));
    cookie.push({
      surahid: data.surahid,
      ayah: data.ayah,
    })
    
    Cookies.set("bookmark", JSON.stringify(cookie));
  }
}

export const deleteBookmark = (surahid, e) => {
  let cookie = JSON.parse(Cookies.get("bookmark"))
  console.log(cookie, surahid);
  cookie.forEach((data, i) => {
    if (data.surahid == Number(surahid)) {
      cookie.splice(i, 1)
      Cookies.set("bookmark", JSON.stringify(cookie))
    }
  })
}

export const hasBookmarked = (surahid) => {
  if (!Cookies.get("bookmark")) return false

  let cookie = JSON.parse(Cookies.get("bookmark"))
  let result = false
  console.log(cookie, surahid)
  for (var i = 0; i < cookie.length; i++) {
    let data = cookie[i]
    if (data.surahid == Number(surahid)) {
      result = true
      break
    }
  }
  
  return result
}

export const handler = (e, options) => {
  const target = e.target
  if (options === "remove") target.parent().remove()
}

export const changeTab = (tab) => {
  Cookies.set("tab-history", tab)
  return tab
}

export const generateKey = (length = 10) => {
  let hash = "abcdefgehijklmnopqrstuvwxyz1234567890"
  let key = ""
  
  for (var i = 0; i < length; i++) {
    key += hash.charAt(Math.floor(Math.random() * hash.length))
  }
  return key
}

let scrollDelay;
let heightScroll = 60;
export const pageScroll = (isActive = true) => {
    if (!isActive) {
      clearTimeout(scrollDelay)
      return false
    }
    window.scrollBy(0, heightScroll);
    scrollDelay = setTimeout(pageScroll, 2000);
}

export const getCoordinate = async () => {
  return await navigator.geolocation.getCurrentPosition();
}

export const getAddress = ({ latitude, longitude }) => {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';

        request.open(method, url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    resolve(address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
}


export const getDateNow = (now = new Date()) => {
  return `${ now.getFullYear() }-${ now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1).toString() : now.getMonth() + 1 }-${ now.getDate().length === 1 ? "0" + now.getDate() : now.getDate() }`;
}