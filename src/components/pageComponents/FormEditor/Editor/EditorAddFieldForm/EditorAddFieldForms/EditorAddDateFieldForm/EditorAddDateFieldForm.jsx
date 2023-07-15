import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";
import "./editorAddDateFieldForm.css";

function EditorAddTextFieldForm({
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
    minDate:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.minDate : "",
    maxDate:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.maxDate : "",
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
      type: "date",
      specs: {
        label: textFieldFormData.label,
        placeholder: textFieldFormData.placeholder,
        defaultValue: textFieldFormData.defaultValue,
        fieldRequired: textFieldFormData.fieldRequired,
        minDate: textFieldFormData.minDate,
        maxDate: textFieldFormData.maxDate,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minDate: "",
      maxDate: "",
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
        minDate: textFieldFormData.minDate,
        maxDate: textFieldFormData.maxDate,
      },
    };
    editDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      minDate: "",
      maxDate: "",
    });
    toggleFormHandler();
  };

  const toggleFieldIsRequiredHandler = () => {
    setTextFieldFormData((prevState) => {
      return { ...textFieldFormData, fieldRequired: !prevState.fieldRequired };
    });
  };

  const toggleAllowTimeSelectionHandler = () => {
    setTextFieldFormData((prevState) => {
      return { ...textFieldFormData, includeTime: !prevState.includeTime };
    });
  };

  const toggleformFieldsIncludeTimeSelectionHandler = (field) => {
    setTextFieldFormData((prevState) => {
      return {
        ...textFieldFormData,
        formFieldsIncludeTime: {
          ...prevState.formFieldsIncludeTime,
          [field]: !prevState.formFieldsIncludeTime[field],
        },
      };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Date field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a date field label"
          value={textFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>

      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Date field minimum date</label>
        <input
          className={`editorField`}
          type="date"
          placeholder="Choose a date field minimum value"
          value={textFieldFormData.minDate}
          onChange={(e) => onChangeMethod(e, "minDate")}
          onClick={(e) => e.target.showPicker()}
          max={textFieldFormData.maxDate}
        />
        {/* <div className="editorFieldContainer allowTimeSwitcher">
          <label className="editorFieldLabel">Allow time selection</label>
          <Switcher
            isOn={textFieldFormData.formFieldsIncludeTime.minDate}
            handleToggle={() =>
              toggleformFieldsIncludeTimeSelectionHandler("minDate")
            }
            forId={"minDateIncludeTime"}
          />
        </div> */}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Date field maximum date</label>
        <input
          className={`editorField`}
          type="date"
          placeholder="Choose a date field maximum value"
          value={textFieldFormData.maxDate}
          onChange={(e) => onChangeMethod(e, "maxDate")}
          onClick={(e) => e.target.showPicker()}
          min={textFieldFormData.minDate}
        />
        {/* <div className="editorFieldContainer allowTimeSwitcher">
          <label className="editorFieldLabel">Allow time selection</label>
          <Switcher
            isOn={textFieldFormData.formFieldsIncludeTime.maxDate}
            handleToggle={() =>
              toggleformFieldsIncludeTimeSelectionHandler("maxDate")
            }
            forId={"maxDateIncludeTime"}
          />
        </div> */}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Date field default value</label>
        <input
          className={`editorField`}
          type="date"
          placeholder="Choose a date field default value"
          value={textFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
          onClick={(e) => e.target.showPicker()}
          min={textFieldFormData.minDate}
          max={textFieldFormData.maxDate}
        />
        {/* <div className="editorFieldContainer allowTimeSwitcher">
          <label className="editorFieldLabel">Allow time selection</label>
          <Switcher
            isOn={textFieldFormData.formFieldsIncludeTime.defaultValue}
            handleToggle={() =>
              toggleformFieldsIncludeTimeSelectionHandler("defaultValue")
            }
            forId={"defaultValueIncludeTime"}
          />
        </div> */}
      </div>
      {/* <div className="editorFieldContainer">
        <label className="editorFieldLabel">Allow time selection</label>
        <Switcher
          isOn={textFieldFormData.includeTime}
          handleToggle={toggleAllowTimeSelectionHandler}
          forId={"includeTime"}
        />
      </div> */}
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

export default EditorAddTextFieldForm;
