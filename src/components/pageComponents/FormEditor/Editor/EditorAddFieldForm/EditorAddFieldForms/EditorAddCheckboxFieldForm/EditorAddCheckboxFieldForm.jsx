import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
// import DropdownOptionsSelector from "./DropdownOptionsSelector/DropdownOptionsSelector";
import Switcher from "../../../../../../switcher/Switcher";
import CheckboxOptionsSelector from "./CheckboxOptionsSelector/CheckboxOptionsSelector";

function EditorAddCheckboxFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [checkboxFieldFormData, setCheckboxFieldFormData] = useState({
    label: formDisplayerMode === "edit" ? fieldToModifyData.specs.label : "",
    options:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.options : [],
    defaultValue:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.defaultValue : [],
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
    let newObj = checkboxFieldFormData;
    newObj[param] = e.target.value;
    setCheckboxFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "checkbox",
      specs: {
        label: checkboxFieldFormData.label,
        options: checkboxFieldFormData.options,
        defaultValue: checkboxFieldFormData.defaultValue,
        fieldRequired: checkboxFieldFormData.fieldRequired,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setCheckboxFieldFormData({
      label: "",
      options: "",
      defaultValue: [],
      fieldRequired: true,
    });
    toggleFormHandler();
  };

  const editFieldObject = () => {
    let newFieldObject = {
      key: fieldToModifyData.key,
      type: fieldToModifyData.type,
      specs: {
        label: checkboxFieldFormData.label,
        options: checkboxFieldFormData.options,
        defaultValue: checkboxFieldFormData.defaultValue,
        fieldRequired: checkboxFieldFormData.fieldRequired,
      },
    };
    editDataFieldHandler(newFieldObject);
    setCheckboxFieldFormData({
      label: "",
      options: "",
      defaultValue: [],
      fieldRequired: true,
    });
    toggleFormHandler();
  };

  const addNewOptionHandler = (option) => {
    setCheckboxFieldFormData((prevState) => ({
      ...prevState,
      options: [...prevState.options, option],
    }));
  };

  const removeOptionHandler = (key) => {
    setCheckboxFieldFormData((prevState) => ({
      ...prevState,
      options: prevState.options.filter((opt) => opt.key != key),
    }));
  };

  const ToggleSetDefaultCheckbox = (key) => {
    const defaultsIncludeKey = checkboxFieldFormData.defaultValue.includes(key);
    if (defaultsIncludeKey) {
      setCheckboxFieldFormData((prevState) => ({
        ...prevState,
        defaultValue: prevState.defaultValue.filter((item) => item != key),
      }));
    } else {
      setCheckboxFieldFormData((prevState) => ({
        ...prevState,
        defaultValue: [...prevState.defaultValue, key],
      }));
    }
  };

  const toggleFieldIsRequiredHandler = () => {
    setCheckboxFieldFormData((prevState) => {
      return {
        ...checkboxFieldFormData,
        fieldRequired: !prevState.fieldRequired,
      };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Checkbox field label</label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a checkbox field label"
          value={checkboxFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Checkbox field options</label>
        <CheckboxOptionsSelector
          addNewOptionHandler={addNewOptionHandler}
          removeOptionHandler={removeOptionHandler}
          checkboxNameGroup={checkboxFieldFormData.label}
          options={checkboxFieldFormData.options}
          ToggleSetDefaultCheckbox={ToggleSetDefaultCheckbox}
          defaultsArray={checkboxFieldFormData.defaultValue}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={checkboxFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"checkboxRequired"}
        />
      </div>

      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={formDisplayerMode === "add" ? "Create" : "Modify"}
          disabled={
            formDataValidation.label ||
            checkboxFieldFormData.options.length <= 0
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

export default EditorAddCheckboxFieldForm;
