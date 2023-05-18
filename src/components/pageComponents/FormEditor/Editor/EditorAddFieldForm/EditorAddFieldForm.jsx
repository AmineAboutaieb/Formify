import React, { useState } from "react";
import "./editorAddFieldForm.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Overlay from "../../../../Modal/Overlay/Overlay";
import CustomModal from "../../../../Modal/Modal";

function EditorAddFieldForm() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="addContainer">
        <IconButton
          variant="contained"
          className="addButton"
          onClick={() => setShow(true)}
        >
          <AddIcon />
        </IconButton>
      </div>
      {show && (
        <Overlay
          closeOverlay={(e) => e.currentTarget == e.target && setShow(false)}
        >
          <CustomModal
            modalTitle="Ajouter un champ"
            closeOverlay={(e) => e.currentTarget == e.target && setShow(false)}
          ></CustomModal>
        </Overlay>
      )}
    </>
  );
}

export default EditorAddFieldForm;
