import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
// import DropdownOptionsSelector from "./DropdownOptionsSelector/DropdownOptionsSelector";
import Switcher from "../../../../../../switcher/Switcher";
import RadioButtonOptionsSelector from "./RadioButtonOptionsSelector/RadioButtonOptionsSelector";

function EditorAddRadioButtonFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [radioButtonFieldFormData, setRadioButtonFieldFormData] = useState({
    label: formDisplayerMode === "edit" ? fieldToModifyData.specs.label : "",
    options:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.options : [],
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
    let newObj = radioButtonFieldFormData;
    newObj[param] = e.target.value;
    setRadioButtonFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "radio",
      specs: {
        label: radioButtonFieldFormData.label,
        options: radioButtonFieldFormData.options,
        defaultValue: radioButtonFieldFormData.defaultValue,
        fieldRequired: radioButtonFieldFormData.fieldRequired,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setRadioButtonFieldFormData({
      label: "",
      options: "",
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
        label: radioButtonFieldFormData.label,
        options: radioButtonFieldFormData.options,
        defaultValue: radioButtonFieldFormData.defaultValue,
        fieldRequired: radioButtonFieldFormData.fieldRequired,
      },
    };
    editDataFieldHandler(newFieldObject);
    setRadioButtonFieldFormData({
      label: "",
      options: "",
      defaultValue: "",
      fieldRequired: true,
    });
    toggleFormHandler();
  };

  const addNewOptionHandler = (option) => {
    setRadioButtonFieldFormData((prevState) => ({
      ...prevState,
      options: [...prevState.options, option],
    }));
  };

  const removeOptionHandler = (key) => {
    setRadioButtonFieldFormData((prevState) => ({
      ...prevState,
      options: prevState.options.filter((opt) => opt.key != key),
    }));
  };

  const ToggleSetDefaultCheckbox = (key) => {
    setRadioButtonFieldFormData((prevState) => {
      return { ...prevState, defaultValue: key };
    });
  };

  const toggleFieldIsRequiredHandler = () => {
    setRadioButtonFieldFormData((prevState) => {
      return {
        ...radioButtonFieldFormData,
        fieldRequired: !prevState.fieldRequired,
      };
    });
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Radio field label</label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a radio field label"
          value={radioButtonFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Radio field options</label>
        <RadioButtonOptionsSelector
          addNewOptionHandler={addNewOptionHandler}
          removeOptionHandler={removeOptionHandler}
          checkboxNameGroup={
            radioButtonFieldFormData.label != ""
              ? radioButtonFieldFormData.label
              : v4()
          }
          options={radioButtonFieldFormData.options}
          ToggleSetDefaultCheckbox={ToggleSetDefaultCheckbox}
          defaultValue={radioButtonFieldFormData.defaultValue}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={radioButtonFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"radioRequired"}
        />
      </div>

      <div className="editorButtonContainer">
        <AppButtonPrimary
          text={formDisplayerMode === "add" ? "Create" : "Modify"}
          disabled={
            formDataValidation.label ||
            radioButtonFieldFormData.options.length <= 0
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

export default EditorAddRadioButtonFieldForm;
