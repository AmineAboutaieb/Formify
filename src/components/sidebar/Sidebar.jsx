import React from "react";
import "./sidebar.css";
import Close from "@material-ui/icons/Close";
import { NavLink } from "react-router-dom";
// import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import SettingsEthernetOutlinedIcon from "@material-ui/icons/CodeOutlined";
import SettingsEthernetOutlinedIcon from "@mui/icons-material/Code";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";

function Sidebar({ showSideBar, setShowSideBar }) {
  return (
    <>
      <div className={showSideBar ? "sidebar" : "sidebar-hidden"}>
        <div className="sidebarTitleWrapper">
          <div className="sidebarTitleContainer">
            <h2>Formify</h2>
            <div className="closeButtonContainer">
              <Close
                className="hideSideBarButton"
                onClick={() => setShowSideBar((prevState) => !prevState)}
              />
            </div>
          </div>
        </div>
        <ul className="sidebarLinks">
          <div className="linkElementContainer">
            <NavLink className="linkElement" to={"/"}>
              <HomeOutlinedIcon className="linkElementIcon" />
              <span>Home</span>
            </NavLink>
          </div>
          <div className="linkElementContainer">
            <NavLink className="linkElement" to={"/new-form-editor"}>
              <DataObjectOutlinedIcon className="linkElementIcon fixIconMarginTop" />
              <span>New form</span>
            </NavLink>
          </div>
        </ul>
      </div>
      {showSideBar && (
        <div
          className="sidebarOverlay"
          onClick={() => setShowSideBar((prevState) => !prevState)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
