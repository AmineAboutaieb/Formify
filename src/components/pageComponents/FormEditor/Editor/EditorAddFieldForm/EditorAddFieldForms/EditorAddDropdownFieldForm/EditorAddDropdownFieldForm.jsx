import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
import DropdownOptionsSelector from "./DropdownOptionsSelector/DropdownOptionsSelector";
import Switcher from "../../../../../../switcher/Switcher";

function EditorAddDropdownFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [dropdownFieldFormData, setDropdownFieldFormData] = useState({
    label: formDisplayerMode === "edit" ? fieldToModifyData.specs.label : "",
    options:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.options : [],
    placeholder:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.placeholder
        : formDisplayerMode === "edit"
        ? fieldToModifyData.specs.placeholder
        : "",
    defaultValue:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.defaultValue : "",
    fieldRequired:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.fieldRequired
        : true,
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
    let newObj = dropdownFieldFormData;
    newObj[param] = e.target.value;
    setDropdownFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "dropdown",
      specs: {
        label: dropdownFieldFormData.label,
        options: dropdownFieldFormData.options,
        placeholder: dropdownFieldFormData.placeholder,
        defaultValue: dropdownFieldFormData.defaultValue,
        fieldRequired: dropdownFieldFormData.fieldRequired,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setDropdownFieldFormData({
      label: "",
      options: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
    });
    toggleFormHandler();
  };

  const editFieldObject = () => {
    let newFieldObject = {
      key: fieldToModifyData.key,
      type: fieldToModifyData.type,
      specs: {
        label: dropdownFieldFormData.label,
        options: dropdownFieldFormData.options,
        placeholder: dropdownFieldFormData.placeholder,
        defaultValue: dropdownFieldFormData.defaultValue,
        fieldRequired: dropdownFieldFormData.fieldRequired,
      },
    };
    editDataFieldHandler(newFieldObject);
    setDropdownFieldFormData({
      label: "",
      options: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
    });
    toggleFormHandler();
  };

  const addNewOptionHandler = (option) => {
    setDropdownFieldFormData((prevState) => ({
      ...prevState,
      options: [...prevState.options, option],
    }));
  };

  const removeOptionHandler = (key) => {
    setDropdownFieldFormData((prevState) => ({
      ...prevState,
      options: prevState.options.filter((opt) => opt.key != key),
    }));
  };

  const toggleFieldIsRequiredHandler = () => {
    setDropdownFieldFormData((prevState) => {
      return {
        ...dropdownFieldFormData,
        fieldRequired: !prevState.fieldRequired,
      };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field label</label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a dropdown field label"
          value={dropdownFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field placeholder</label>
        <input
          className="editorField"
          type="text"
          placeholder="Choose a dropdown field placeholder"
          value={dropdownFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field default value</label>
        <input
          className="editorField"
          type="text"
          placeholder="Choose a dropdown field default value"
          value={dropdownFieldFormData.defaultValue}
          onChange={(e) => onChangeMethod(e, "defaultValue")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field options</label>
        <DropdownOptionsSelector
          addNewOptionHandler={addNewOptionHandler}
          removeOptionHandler={removeOptionHandler}
          options={dropdownFieldFormData.options}
        />
      </div>
      <div className="editorFieldContainer">
        <Switcher
          isOn={dropdownFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
        />
      </div>

      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={formDisplayerMode === "add" ? "Create" : "Modify"}
          disabled={
            formDataValidation.label ||
            dropdownFieldFormData.options.length <= 0
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

export default EditorAddDropdownFieldForm;
