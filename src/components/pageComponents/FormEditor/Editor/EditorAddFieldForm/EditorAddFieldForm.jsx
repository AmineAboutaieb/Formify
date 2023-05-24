import React from "react";
import "./editorAddFieldForm.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../../../../styles/sharedEditorFieldStyles.css";

function EditorAddFieldForm({ setShowFormDisplayer, setFormDisplayerMode }) {
  const showAddFormHandler = () => {
    setFormDisplayerMode("add");
    setShowFormDisplayer(true);
  };
  return (
    <>
      <div className="addContainer">
        <IconButton
          variant="contained"
          className="addButton"
          onClick={showAddFormHandler}
        >
          <AddIcon />
        </IconButton>
      </div>
    </>
  );
}

export default EditorAddFieldForm;
