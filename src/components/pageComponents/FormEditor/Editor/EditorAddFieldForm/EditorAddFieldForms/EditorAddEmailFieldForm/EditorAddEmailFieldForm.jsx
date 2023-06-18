import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";

function EditorAddEmailFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [EmailFieldFormData, setEmailFieldFormData] = useState({
    label: formDisplayerMode === "edit" ? fieldToModifyData.specs.label : "",
    placeholder:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.placeholder : "",
    defaultValue:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.defaultValue : "",
    fieldRequired:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.fieldRequired
        : true,
    minLength:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.minLength : "",
    maxLength:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.maxLength : "",
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
    let newObj = EmailFieldFormData;
    newObj[param] = e.target.value;
    setEmailFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "email",
      specs: {
        label: EmailFieldFormData.label,
        placeholder: EmailFieldFormData.placeholder,
        defaultValue: EmailFieldFormData.defaultValue,
        fieldRequired: EmailFieldFormData.fieldRequired,
        minLength: EmailFieldFormData.minLength,
        maxLength: EmailFieldFormData.maxLength,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setEmailFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minLength: "",
      maxLength: "",
    });
    toggleFormHandler();
  };

  const editFieldObject = () => {
    let newFieldObject = {
      key: fieldToModifyData.key,
      specs: {
        label: EmailFieldFormData.label,
        placeholder: EmailFieldFormData.placeholder,
        defaultValue: EmailFieldFormData.defaultValue,
        fieldRequired: EmailFieldFormData.fieldRequired,
        minLength: EmailFieldFormData.minLength,
        maxLength: EmailFieldFormData.maxLength,
      },
    };
    editDataFieldHandler(newFieldObject);
    setEmailFieldFormData({
      label: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minLength: "",
      maxLength: "",
    });
    toggleFormHandler();
  };

  const toggleFieldIsRequiredHandler = () => {
    setEmailFieldFormData((prevState) => {
      return { ...EmailFieldFormData, fieldRequired: !prevState.fieldRequired };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Email field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose an email field label"
          value={EmailFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Email field placeholder</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose an email field placeholder"
          value={EmailFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Email field default value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose an email field default value"
          value={EmailFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Email minimum field length</label>
        <input
          className={`editorField`}
          type="number"
          placeholder="Choose an minimum field length"
          value={EmailFieldFormData.minLength}
          onChange={(e) => onChangeMethod(e, "minLength")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Email maximum field length</label>
        <input
          className={`editorField`}
          type="number"
          placeholder="Choose an maximum field length"
          value={EmailFieldFormData.maxLength}
          onChange={(e) => onChangeMethod(e, "maxLength")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={EmailFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"emailRequired"}
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

export default EditorAddEmailFieldForm;
