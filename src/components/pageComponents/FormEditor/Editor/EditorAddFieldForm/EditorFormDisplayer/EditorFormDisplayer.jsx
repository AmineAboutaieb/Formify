import React, { useEffect, useState } from "react";
import Overlay from "../../../../../Modal/Overlay/Overlay";
import CustomModal from "../../../../../Modal/Modal";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorAddTextFieldForm from "../EditorAddFieldForms/EditorAddTextFieldForm/EditorAddTextFieldForm";
import EditorAddDropdownFieldForm from "../EditorAddFieldForms/EditorAddDropdownFieldForm/EditorAddDropdownFieldForm";
import EditorAddEmailFieldForm from "../EditorAddFieldForms/EditorAddEmailFieldForm/EditorAddEmailFieldForm";
import EditorAddPasswordFieldForm from "../EditorAddFieldForms/EditorAddPasswordFieldForm/EditorAddPasswordFieldForm";
import EditorAddNumberFieldForm from "../EditorAddFieldForms/EditorAddNumberFieldForm/EditorAddNumberFieldForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  const [formRef] = useAutoAnimate();
  return (
    <Overlay
      closeOverlay={(e) =>
        e.currentTarget == e.target && setShowFormDisplayer(false)
      }
    >
      <CustomModal
        ref={formRef}
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
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="password">Password</option>
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
          {newFieldTypeDropdownValue === "email" && (
            <EditorAddEmailFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "password" && (
            <EditorAddPasswordFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "number" && (
            <EditorAddNumberFieldForm
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
