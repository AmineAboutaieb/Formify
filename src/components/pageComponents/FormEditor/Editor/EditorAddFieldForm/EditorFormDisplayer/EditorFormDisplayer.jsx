import React, { useEffect, useState } from "react";
import Overlay from "../../../../../Modal/Overlay/Overlay";
import CustomModal from "../../../../../Modal/Modal";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorAddTextFieldForm from "../EditorAddFieldForms/EditorAddTextFieldForm/EditorAddTextFieldForm";
import EditorAddDropdownFieldForm from "../EditorAddFieldForms/EditorAddDropdownFieldForm/EditorAddDropdownFieldForm";

function EditorFormDisplayer({
  setShowFormDisplayer,
  addNewDataFieldHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [newFieldTypeDropdownValue, setNewFieldTypeDropdownValue] = useState(
    formDisplayerMode === "add" ? "text" : fieldToModifyData.type
  );
  const onNewFieldTypeDropdownChange = (e) => {
    setNewFieldTypeDropdownValue(e.target.value);
  };

  const toggleFormHandler = () => {
    setShowFormDisplayer(false);
  };
  return (
    <Overlay
      closeOverlay={(e) =>
        e.currentTarget == e.target && setShowFormDisplayer(false)
      }
    >
      <CustomModal
        modalTitle={
          formDisplayerMode === "add" ? "Add a field" : "Modify field"
        }
        closeOverlay={(e) =>
          e.currentTarget == e.target && setShowFormDisplayer(false)
        }
      >
        <div className="editorFieldContainer">
          <label className="editorFieldLabel">Field Type</label>
          <select
            className="editorField"
            placeholder="Choose a field type"
            onChange={onNewFieldTypeDropdownChange}
            defaultValue={newFieldTypeDropdownValue}
            disabled={formDisplayerMode === "add" ? false : true}
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
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "dropdown" && (
            <EditorAddDropdownFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
        </div>
      </CustomModal>
    </Overlay>
  );
}

export default EditorFormDisplayer;