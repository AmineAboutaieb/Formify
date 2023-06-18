import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";

function EditorAddPasswordFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [textPasswordFormData, setPasswordFieldFormData] = useState({
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
    let newObj = textPasswordFormData;
    newObj[param] = e.target.value;
    setPasswordFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "password",
      specs: {
        label: textPasswordFormData.label,
        placeholder: textPasswordFormData.placeholder,
        defaultValue: textPasswordFormData.defaultValue,
        fieldRequired: textPasswordFormData.fieldRequired,
        minLength: textPasswordFormData.minLength,
        maxLength: textPasswordFormData.maxLength,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setPasswordFieldFormData({
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
        label: textPasswordFormData.label,
        placeholder: textPasswordFormData.placeholder,
        defaultValue: textPasswordFormData.defaultValue,
        fieldRequired: textPasswordFormData.fieldRequired,
        minLength: textPasswordFormData.minLength,
        maxLength: textPasswordFormData.maxLength,
      },
    };
    editDataFieldHandler(newFieldObject);
    setPasswordFieldFormData({
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
    setPasswordFieldFormData((prevState) => {
      return {
        ...textPasswordFormData,
        fieldRequired: !prevState.fieldRequired,
      };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Password field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a password field label"
          value={textPasswordFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Password field placeholder</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a password field placeholder"
          value={textPasswordFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Password field default value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a password field default value"
          value={textPasswordFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          Password field minimum length
        </label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a password field minimum length"
          value={textPasswordFormData.minLength}
          onChange={(e) => onChangeMethod(e, "minLength")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          Password field maximum length
        </label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a password field maximum length"
          value={textPasswordFormData.maxLength}
          onChange={(e) => onChangeMethod(e, "maxLength")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={textPasswordFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"passwordRequired"}
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

export default EditorAddPasswordFieldForm;
