import React from "react";
import { createPortal } from "react-dom";
import "./overlay.css";

function Overlay({ children, closeOverlay }) {
  return createPortal(
    <div className="overlayStyles" onClick={closeOverlay}>
      {children}
    </div>,
    document.getElementById("overlay")
  );
}

export default Overlay;
