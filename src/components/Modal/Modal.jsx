import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./modal.css";

function Modal({ children, closeOverlay, modalTitle }) {
  return (
    <div className="modalContainer">
      <div className="modalheader">
        <p className="modalTitle">{modalTitle}</p>
        <CloseIcon className="close" onClick={closeOverlay} />
      </div>
      <div className="modalContent">{children}</div>
    </div>
  );
}

export default Modal;
