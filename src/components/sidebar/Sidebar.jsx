import React from "react";
import "./sidebar.css";
import Close from "@material-ui/icons/Close";

function Sidebar({ showSideBar, setShowSideBar }) {
  return (
    <>
      <div className={showSideBar ? "sidebar" : "sidebar-hidden"}>
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
