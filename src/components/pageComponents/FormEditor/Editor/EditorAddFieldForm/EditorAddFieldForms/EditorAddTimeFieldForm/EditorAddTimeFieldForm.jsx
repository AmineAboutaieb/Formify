import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";
import "./editorAddTimeFieldForm.css";

function EditorAddTimeFieldForm({
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
    minTime:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.minTime : "",
    maxTime:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.maxTime : "",
  });
  const [formDataValidation, setFormDataValidation] = useState({
    label: formDisplayerMode === "edit" ? false : true,
    defaultValue: false,
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
    if (param === "defaultValue") {
      setFormDataValidation((prevState) => ({
        ...prevState,
        defaultValue: !e.target.validity.valid,
      }));
    }
    let newObj = textFieldFormData;
    newObj[param] = e.target.value;
    setTextFieldFormData({
      ...newObj,
    });
    if (param === "label") {
      validationVerifier(e, param);
    }
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "time",
      specs: {
        label: textFieldFormData.label,
        placeholder: textFieldFormData.placeholder,
        defaultValue: textFieldFormData.defaultValue,
        fieldRequired: textFieldFormData.fieldRequired,
        minTime: textFieldFormData.minTime,
        maxTime: textFieldFormData.maxTime,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minTime: "",
      maxTime: "",
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
        minTime: textFieldFormData.minTime,
        maxTime: textFieldFormData.maxTime,
      },
    };
    editDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minTime: "",
      maxTime: "",
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
        <label className="editorFieldLabel">Time field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a time field label"
          value={textFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>

      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Time field minimum value</label>
        <input
          className={`editorField`}
          type="time"
          placeholder="Choose a time field minimum value"
          value={textFieldFormData.minTime}
          onChange={(e) => onChangeMethod(e, "minTime")}
          onClick={(e) => e.target.showPicker()}
          max={textFieldFormData.maxTime}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Time field maximum value</label>
        <input
          className={`editorField`}
          type="time"
          placeholder="Choose a time field maximum value"
          value={textFieldFormData.maxTime}
          onChange={(e) => onChangeMethod(e, "maxTime")}
          onClick={(e) => e.target.showPicker()}
          min={textFieldFormData.minTime}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Time field default value</label>
        <input
          className={`editorField ${
            formDataValidation.defaultValue ? "notValidFormElement" : ""
          }`}
          type="time"
          placeholder="Choose a time field default value"
          value={textFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
          onClick={(e) => e.target.showPicker()}
          min={textFieldFormData.minTime}
          max={textFieldFormData.maxTime}
        />
        {formDataValidation.defaultValue && (
          <span className="notValidText">
            The default time value has to be between the minimum and the maximum
            time values *
          </span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={textFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"textRequired"}
        />
      </div>
      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={formDisplayerMode === "add" ? "Create" : "Modify"}
          disabled={
            formDataValidation.label ||
            formDataValidation.type ||
            formDataValidation.defaultValue
              ? true
              : false
          }
          clickHandler={
            formDisplayerMode === "add" ? createNewFieldObject : editFieldObject
          }
        />
      </div>
    </>
  );
}

export default EditorAddTimeFieldForm;
