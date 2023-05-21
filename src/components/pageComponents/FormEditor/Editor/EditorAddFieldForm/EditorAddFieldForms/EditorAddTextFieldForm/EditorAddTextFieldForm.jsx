import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";

function EditorAddTextFieldForm({ addNewDataFieldHandler, toggleFormHandler }) {
  const [textFieldFormData, setTextFieldFormData] = useState({
    label: "",
    type: "text",
    placeholder: "",
    defaultValue: "",
  });
  const [formDataValidation, setFormDataValidation] = useState({
    label: true,
    type: false,
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
      type: "text",
      specs: {
        label: textFieldFormData.label,
        inputType: textFieldFormData.type,
        placeholder: textFieldFormData.placeholder,
        defaultValue: textFieldFormData.defaultValue,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
    });
    toggleFormHandler();
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Text field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a text field label"
          value={textFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Text field type</label>
        <select
          className={`editorField ${
            formDataValidation.type ? "notValidFormElement" : ""
          }`}
          placeholder="Choose a text field type"
          value={textFieldFormData.type}
          onChange={(e) => onChangeMethod(e, "type")}
        >
          <option value={"text"} defaultChecked={true}>
            Text
          </option>
          <option value={"email"}>Email</option>
          <option value={"password"}>Password</option>
        </select>
        {formDataValidation.type && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Text field placeholder</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a text field placeholder"
          value={textFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Text field default value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a text field default value"
          value={textFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={"Create"}
          disabled={
            formDataValidation.label || formDataValidation.type ? true : false
          }
          clickHandler={createNewFieldObject}
        />
      </div>
    </>
  );
}

export default EditorAddTextFieldForm;