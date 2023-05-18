import React from "react";
import "./navbar.css";
// import MenuIcon from "@material-ui/icons/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Darkmode from "../darkmode/Darkmode";

function Navbar({ showSideBar, setShowSideBar }) {
  return (
    <div className="navbar">
      <div className="barsContainer">
        <MenuIcon
          className="bars"
          onClick={() => setShowSideBar((prevState) => !prevState)}
        />
      </div>
      <div className="optionsContainer">
        <Darkmode />
      </div>
    </div>
  );
}

export default Navbar;
