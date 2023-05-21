import React, { useEffect, useState } from "react";
import "./editorAddFieldForm.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Overlay from "../../../../Modal/Overlay/Overlay";
import CustomModal from "../../../../Modal/Modal";
import "../../../../../styles/sharedEditorFieldStyles.css";
import EditorAddTextFieldForm from "./EditorAddFieldForms/EditorAddTextFieldForm/EditorAddTextFieldForm";
import EditorAddDropdownFieldForm from "./EditorAddFieldForms/EditorAddDropdownFieldForm/EditorAddDropdownFieldForm";

function EditorAddFieldForm({ addNewDataFieldHandler }) {
  const [show, setShow] = useState(false);
  const [newFieldTypeDropdownValue, setNewFieldTypeDropdownValue] =
    useState("text");
  const onNewFieldTypeDropdownChange = (e) => {
    setNewFieldTypeDropdownValue(e.target.value);
  };

  const toggleFormHandler = () => {
    setShow(false);
  };

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
            modalTitle="Add a field"
            closeOverlay={(e) => e.currentTarget == e.target && setShow(false)}
          >
            <div className="editorFieldContainer">
              <label className="editorFieldLabel">Field Type</label>
              <select
                className="editorField"
                placeholder="Choose a field type"
                onChange={onNewFieldTypeDropdownChange}
                defaultValue={newFieldTypeDropdownValue}
              >
                <option value="text">Text</option>
                <option value="dropdown">Dropdown</option>
              </select>
            </div>
            <div className="newFieldFormContainer">
              {newFieldTypeDropdownValue === "text" && (
                <EditorAddTextFieldForm
                  addNewDataFieldHandler={addNewDataFieldHandler}
                  toggleFormHandler={toggleFormHandler}
                />
              )}
              {newFieldTypeDropdownValue === "dropdown" && (
                <EditorAddDropdownFieldForm
                  addNewDataFieldHandler={addNewDataFieldHandler}
                  toggleFormHandler={toggleFormHandler}
                />
              )}
            </div>
          </CustomModal>
        </Overlay>
      )}
    </>
  );
}

export default EditorAddFieldForm;
