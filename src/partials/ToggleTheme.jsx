import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useTheme } from "../hooks/useTheme"

export default function ToggleTheme () {
  const [Theme, setTheme] = useTheme();
  const [isDark, setIsDark] = useState(Theme);
  
    
  const handler = () => {
    setIsDark(!isDark);
    setTheme(isDark ? "dark" : "light");
  }
  
  return (
    <div onClick={ handler } className="toggle-theme">
      <FontAwesomeIcon icon={ isDark ? faMoon : faSun }/>
    </div>
  )
}