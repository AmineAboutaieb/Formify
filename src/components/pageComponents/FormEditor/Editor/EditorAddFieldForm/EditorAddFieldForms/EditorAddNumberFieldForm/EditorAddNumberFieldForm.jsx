import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";

function EditorAddNumberFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [textFieldFormData, setTextFieldFormData] = useState({
    label: formDisplayerMode === "edit" ? fieldToModifyData.specs.label : "",
    placeholder:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.placeholder : "",
    defaultValue:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.defaultValue : "",
    fieldRequired:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.fieldRequired
        : true,
    minNumber:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.minNumber : "",
    maxNumber:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.maxNumber : "",
  });
  const [formDataValidation, setFormDataValidation] = useState({
    label: formDisplayerMode === "edit" ? false : true,
  });

  const validationVerifier = (e, param) => {
    let key = param;
    let newObj = formDataValidation;
    if (e.target.value === "" || e.target.value.trim() === "") {
      newObj[key] = true;
    } else {
      newObj[key] = false;
    }
    setFormDataValidation({ ...newObj });
  };

  const onChangeMethod = (e, param) => {
    let newObj = textFieldFormData;
    newObj[param] = e.target.value;
    setTextFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "number",
      specs: {
        label: textFieldFormData.label,
        placeholder: textFieldFormData.placeholder,
        defaultValue: textFieldFormData.defaultValue,
        fieldRequired: textFieldFormData.fieldRequired,
        minNumber: textFieldFormData.minNumber,
        maxNumber: textFieldFormData.maxNumber,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minNumber: "",
      maxNumber: "",
    });
    toggleFormHandler();
  };

  const editFieldObject = () => {
    let newFieldObject = {
      key: fieldToModifyData.key,
      specs: {
        label: textFieldFormData.label,
        placeholder: textFieldFormData.placeholder,
        defaultValue: textFieldFormData.defaultValue,
        fieldRequired: textFieldFormData.fieldRequired,
        minNumber: textFieldFormData.minNumber,
        maxNumber: textFieldFormData.maxNumber,
      },
    };
    editDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minNumber: "",
      maxNumber: "",
    });
    toggleFormHandler();
  };

  const toggleFieldIsRequiredHandler = () => {
    setTextFieldFormData((prevState) => {
      return { ...textFieldFormData, fieldRequired: !prevState.fieldRequired };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a number field label"
          value={textFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field placeholder</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field placeholder"
          value={textFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field default value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field default value"
          value={textFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field minimum value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field minimum value"
          value={textFieldFormData.minNumber}
          onChange={(e) => onChangeMethod(e, "minNumber")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field maximum value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field maximum value"
          value={textFieldFormData.maxNumber}
          onChange={(e) => onChangeMethod(e, "maxNumber")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={textFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"numberRequired"}
        />
      </div>
      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={formDisplayerMode === "add" ? "Create" : "Modify"}
          disabled={
            formDataValidation.label || formDataValidation.type ? true : false
          }
          clickHandler={
            formDisplayerMode === "add" ? createNewFieldObject : editFieldObject
          }
        />
      </div>
    </>
  );
}

export default EditorAddNumberFieldForm;
