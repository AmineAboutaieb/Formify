import React, { useEffect, useState } from "react";
import Overlay from "../../../../../Modal/Overlay/Overlay";
import CustomModal from "../../../../../Modal/Modal";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import "./editorFormDisplayer.css";
import EditorAddTextFieldForm from "../EditorAddFieldForms/EditorAddTextFieldForm/EditorAddTextFieldForm";
import EditorAddDropdownFieldForm from "../EditorAddFieldForms/EditorAddDropdownFieldForm/EditorAddDropdownFieldForm";
import EditorAddEmailFieldForm from "../EditorAddFieldForms/EditorAddEmailFieldForm/EditorAddEmailFieldForm";
import EditorAddPasswordFieldForm from "../EditorAddFieldForms/EditorAddPasswordFieldForm/EditorAddPasswordFieldForm";
import EditorAddNumberFieldForm from "../EditorAddFieldForms/EditorAddNumberFieldForm/EditorAddNumberFieldForm";
import EditorAddPhoneFieldForm from "../EditorAddFieldForms/EditorAddPhoneFieldForm/EditorAddPhoneFieldForm";
import EditorAddDateFieldForm from "../EditorAddFieldForms/EditorAddDateFieldForm/EditorAddDateFieldForm";
import EditorAddTimeFieldForm from "../EditorAddFieldForms/EditorAddTimeFieldForm/EditorAddTimeFieldForm";
import EditorAddCheckboxFieldForm from "../EditorAddFieldForms/EditorAddCheckboxFieldForm/EditorAddCheckboxFieldForm";
import EditorAddRadioButtonFieldForm from "../EditorAddFieldForms/EditorAddRadioButtonFieldForm/EditorAddRadioButtonFieldForm";

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
        id="addFormModal"
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
            <option value="phone">Phone</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
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
          {newFieldTypeDropdownValue === "phone" && (
            <EditorAddPhoneFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "date" && (
            <EditorAddDateFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "time" && (
            <EditorAddTimeFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "checkbox" && (
            <EditorAddCheckboxFieldForm
              addNewDataFieldHandler={addNewDataFieldHandler}
              toggleFormHandler={toggleFormHandler}
              formDisplayerMode={formDisplayerMode}
              fieldToModifyData={fieldToModifyData}
              editDataFieldHandler={editDataFieldHandler}
            />
          )}
          {newFieldTypeDropdownValue === "radio" && (
            <EditorAddRadioButtonFieldForm
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
