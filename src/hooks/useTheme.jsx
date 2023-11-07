import React, { useContext, useEffect, useState } from "react";

export const GlobalThemeContext = React.createContext("light");

export const GlobalThemeProvider = ({ children }) => {
  const [Theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // let isDark = localStorage.getItem("theme") === "dark";

  useEffect(() => {
    document.querySelector("body").removeAttribute("class");
    document.querySelector("body").classList.toggle(Theme);

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.setItem("theme", Theme);
    setTheme(Theme);
  }, [Theme]);

  return (
    <GlobalThemeContext.Provider value={[Theme, setTheme]}>
      {children}
    </GlobalThemeContext.Provider>
  );
};

export const useTheme = () => {
  const [Theme, setTheme] = useContext(GlobalThemeContext);

  if (!Theme) console.log("useTheme must be used inside a GlobalThemeProvider");

  return [Theme, setTheme];
};
