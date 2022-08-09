import Cookies from 'js-cookie' 

let audios = []
const playMurottal = (source, ayahNumber) => {
  for (let i = 0; i < audios.length; i++) {
    /* found played audio */
    /*
    if (audios[i].data.duration > 0 && !audios[i].data.paused) {
      audios[i].data.pause()
    }
    
    */
    if (audios[i].id === Number(ayahNumber)) {
      const audio = audios[i]
      if (audio.data.duration > 0 && !audio.data.paused) {
        audio.data.pause()
      } else {
        if (audio.data.paused) {
          audio.data.play()
        }
      }
      audios[i].data = audio.data
    }
    if (i === audios.length - 1 && audios[i].id !== Number(ayahNumber)) {
      let newAudio = new Audio()
          newAudio.src = source
          newAudio.play()
          audios.push({
            id: Number(ayahNumber),
            data: newAudio
          })
    }
  }
  if (audios.length < 1) {
    let newAudio = new Audio()
        newAudio.src = source
        newAudio.play()
        audios.push({
          id: Number(ayahNumber),
          data: newAudio
        })
    return true
  }
}

const bookmark = (data, e) => {
  if (!Cookies.get("bookmark")) {
    Cookies.set("bookmark", JSON.stringify([{
      surahid: data.surahid,
      ayah: data.ayah,
    }]))
  } else {
    let cookie = JSON.parse(Cookies.get("bookmark"))
    cookie.push({
      surahid: data.surahid,
      ayah: data.ayah,
    })
    
    Cookies.set("bookmark", JSON.stringify(cookie))
  }
}
const deleteBookmark = (surahid, e) => {
  let cookie = JSON.parse(Cookies.get("bookmark"))
  console.log(cookie, surahid);
  cookie.forEach((data, i) => {
    if (data.surahid == Number(surahid)) {
      cookie.splice(i, 1)
      Cookies.set("bookmark", JSON.stringify(cookie))
    }
  })
}

const hasBookmarked = (surahid) => {
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
const handler = (e, options) => {
  const target = e.target
  if (options === "remove") target.parent().remove()
}

const changeTab = (tab) => {
  Cookies.set("tab-history", tab)
  return tab
}

const generateKey = (length = 10) => {
  let hash = "abcdefgehijklmnopqrstuvwxyz1234567890"
  let key = ""
  
  for (var i = 0; i < length; i++) {
    key += hash.charAt(Math.floor(Math.random() * hash.length))
  }
  return key
}
let scrollDelay
let heightScroll = 60
const pageScroll = (isActive = true) => {
    if (!isActive) {
      clearTimeout(scrollDelay)
      return false
    }
    window.scrollBy(0, heightScroll);
    scrollDelay = setTimeout(pageScroll, 2000);
}

export { 
  playMurottal, 
  bookmark, 
  deleteBookmark, 
  hasBookmarked, 
  handler,
  changeTab,
  generateKey,
  pageScroll
}