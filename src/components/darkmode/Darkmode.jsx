import React, { useState, useEffect } from "react";
import DarkModeIcon from "@material-ui/icons/WbSunnyTwoTone";
import LightModeIcon from "@material-ui/icons/WbSunny";

import "./darkmode.css";

function Darkmode() {
  useEffect(() => {
    let theme = localStorage.getItem("formify-theme") ?? "dark";
    if (theme == "dark") setDarkMode();
    else setLightMode();
  }, []);
  const [savedTheme, setSavedTheme] = useState("");
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("formify-theme", "dark");
    setSavedTheme("dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("formify-theme", "light");
    setSavedTheme("light");
  };
  const toggleTheme = () => {
    if (savedTheme === "light") setDarkMode();
    else setLightMode();
  };
  return (
    <div className="themeIconContainer" onClick={toggleTheme}>
      {savedTheme === "dark" ? (
        <LightModeIcon className="sunIcon" />
      ) : (
        <DarkModeIcon className="moonIcon" />
      )}
    </div>
  );
}

export default Darkmode;
