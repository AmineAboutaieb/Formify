import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";

function EditorAddTextFieldForm() {
  const [textFieldFormData, setTextFieldFormData] = useState({
    label: "",
    type: "",
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
          defaultValue={textFieldFormData.label}
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
          defaultValue={textFieldFormData.type}
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
          defaultValue={textFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Text field default value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a text field default value"
          defaultValue={textFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={"Create"}
          disabled={
            formDataValidation.label || formDataValidation.type ? true : false
          }
          clickHandler={() => alert("Submitted")}
        />
      </div>
    </>
  );
}

export default EditorAddTextFieldForm;
