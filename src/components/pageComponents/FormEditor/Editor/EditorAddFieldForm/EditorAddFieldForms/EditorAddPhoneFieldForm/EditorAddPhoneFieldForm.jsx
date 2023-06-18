import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import "./editorAddPhoneFieldForm.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";
import ReactFlagsSelect from "react-flags-select";
import PhoneCountryOptionsSelector from "./PhoneCountryOptionsSelector/PhoneOptionsSelector";

function EditorAddPhoneFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [allCountriesOption, setAllCountriesOption] = useState(true);
  const [blackListSelectedCountries, setBlackListSelectedCountries] =
    useState(true);

  const addSelectedCountryHandler = (code) => {
    if (!allCountriesOption) setSelectedCountries([...selectedCountries, code]);
  };
  const removeSelectedCountryHandler = (code) => {
    let newSelectedCountries = [...selectedCountries];
    newSelectedCountries = newSelectedCountries.filter((item) => item !== code);
    setSelectedCountries(newSelectedCountries);
  };
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
    desiredCountries:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.desiredCountries
        : [],
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
      type: "text",
      specs: {
        label: textFieldFormData.label,
        placeholder: textFieldFormData.placeholder,
        defaultValue: textFieldFormData.defaultValue,
        fieldRequired: textFieldFormData.fieldRequired,
        desiredCountries: textFieldFormData.desiredCountries,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      desiredCountries: [],
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
        desiredCountries: textFieldFormData.desiredCountries,
      },
    };
    editDataFieldHandler(newFieldObject);
    setTextFieldFormData({
      label: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      desiredCountries: [],
    });
    toggleFormHandler();
  };

  const toggleFieldIsRequiredHandler = () => {
    setTextFieldFormData((prevState) => {
      return { ...textFieldFormData, fieldRequired: !prevState.fieldRequired };
    });
  };
  const toggleAllCountriesOption = () => {
    setAllCountriesOption((prevState) => !prevState);
  };

  const toggleBlackListSelectedCountries = () => {
    setBlackListSelectedCountries((prevState) => !prevState);
  };

  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Phone field label </label>
        <input
          className={`editorField ${
            formDataValidation.label ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Choose a phone field label"
          value={textFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Show all countries</label>
        <Switcher
          isOn={allCountriesOption}
          handleToggle={toggleAllCountriesOption}
          forId={"showAllCountries"}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          Phone field countries that will be displayed
        </label>
        <ReactFlagsSelect
          searchable
          selected={selectedCountry}
          onSelect={(code) => addSelectedCountryHandler(code)}
          selectButtonClassName="forcedEditorField"
          fullWidth={false}
          countries={!allCountriesOption ? selectedCountries : []}
          blacklistCountries
          placeholder={
            allCountriesOption
              ? "All countries"
              : "Choose the countries to show"
          }
        />
      </div>
      {!allCountriesOption && (
        <>
          <div className="editorFieldContainer">
            <label className="editorFieldLabel">Selected countries</label>
            <PhoneCountryOptionsSelector
              removeOptionHandler={removeSelectedCountryHandler}
              options={selectedCountries}
            />
          </div>
          <div className="editorFieldContainer">
            <label className="editorFieldLabel">
              {blackListSelectedCountries
                ? "Don't show selected countries"
                : "Only show selected countries"}
            </label>
            <Switcher
              isOn={blackListSelectedCountries}
              handleToggle={toggleBlackListSelectedCountries}
              forId={"blackListSelectedCountries"}
            />
          </div>
        </>
      )}

      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Phone field placeholder</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a phone field placeholder"
          value={textFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>

      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={textFieldFormData.fieldRequired}
          handleToggle={toggleFieldIsRequiredHandler}
          forId={"phoneRequired"}
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

export default EditorAddPhoneFieldForm;
