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
  const [textNumberFormData, setNumberFieldFormData] = useState({
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
    let newObj = textNumberFormData;
    newObj[param] = e.target.value;
    setNumberFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "number",
      specs: {
        label: textNumberFormData.label,
        placeholder: textNumberFormData.placeholder,
        defaultValue: textNumberFormData.defaultValue,
        fieldRequired: textNumberFormData.fieldRequired,
        minNumber: textNumberFormData.minNumber,
        maxNumber: textNumberFormData.maxNumber,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setNumberFieldFormData({
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
        label: textNumberFormData.label,
        placeholder: textNumberFormData.placeholder,
        defaultValue: textNumberFormData.defaultValue,
        fieldRequired: textNumberFormData.fieldRequired,
        minNumber: textNumberFormData.minNumber,
        maxNumber: textNumberFormData.maxNumber,
      },
    };
    editDataFieldHandler(newFieldObject);
    setNumberFieldFormData({
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
    setNumberFieldFormData((prevState) => {
      return { ...textNumberFormData, fieldRequired: !prevState.fieldRequired };
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
          value={textNumberFormData.label}
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
          value={textNumberFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field default value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field default value"
          value={textNumberFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field minimum value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field minimum value"
          value={textNumberFormData.minNumber}
          onChange={(e) => onChangeMethod(e, "minNumber")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Number field maximum value</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a number field maximum value"
          value={textNumberFormData.maxNumber}
          onChange={(e) => onChangeMethod(e, "maxNumber")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={textNumberFormData.fieldRequired}
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
