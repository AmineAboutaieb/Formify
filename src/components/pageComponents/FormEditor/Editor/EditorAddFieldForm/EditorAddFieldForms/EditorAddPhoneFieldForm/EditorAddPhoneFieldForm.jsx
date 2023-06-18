import React, { useState } from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";
import AppButtonPrimary from "../../../../../../appButtons/AppButtonPrimary";
import { v4 as uuidv4, v4 } from "uuid";
import Switcher from "../../../../../../switcher/Switcher";
import ReactFlagsSelect from "react-flags-select";
import Countries from "../../../../../../componentsAssets/Countries";
import PhoneFieldOptionsSelector from "./PhoneFieldOptionsSelector/PhoneFieldOptionsSelector";
import CustomCountryLabels from "../../../../../../componentsAssets/CustomCountryLabels.json";

function EditorAddPhoneFieldForm({
  addNewDataFieldHandler,
  toggleFormHandler,
  formDisplayerMode,
  fieldToModifyData,
  editDataFieldHandler,
}) {
  const allCountryCodes = Object.keys(Countries);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneFieldFormData, setPhoneFieldFormData] = useState({
    label: formDisplayerMode === "edit" ? fieldToModifyData.specs.label : "",
    placeholder:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.placeholder : "",
    defaultValue:
      formDisplayerMode === "edit" ? fieldToModifyData.specs.defaultValue : "",
    fieldRequired:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.fieldRequired
        : true,
    showAllCountries:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.showAllCountries
        : true,
    showAllCountriesDefault:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.showAllCountriesDefault
        : "",
    selectedCountries:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.selectedCountries
        : [],
    selectedCountriesDefault:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.selectedCountriesDefault
        : "",
    selectedCountriesBlackListed:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.selectedCountriesBlackListed
        : true,
    selectedCountriesBlackListedDefault:
      formDisplayerMode === "edit"
        ? fieldToModifyData.specs.selectedCountriesBlackListedDefault
        : "",
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
    let newObj = phoneFieldFormData;
    newObj[param] = e.target.value;
    setPhoneFieldFormData({
      ...newObj,
    });
    validationVerifier(e, param);
  };

  const createNewFieldObject = () => {
    let newFieldObject = {
      key: v4(),
      type: "phone",
      specs: {
        label: phoneFieldFormData.label,
        placeholder: phoneFieldFormData.placeholder,
        defaultValue: phoneFieldFormData.defaultValue,
        fieldRequired: phoneFieldFormData.fieldRequired,
        showAllCountries: phoneFieldFormData.showAllCountries,
        showAllCountriesDefault: phoneFieldFormData.showAllCountriesDefault,
        selectedCountries: phoneFieldFormData.selectedCountries,
        selectedCountriesDefault: phoneFieldFormData.selectedCountriesDefault,
        selectedCountriesBlackListed:
          phoneFieldFormData.selectedCountriesBlackListed,
        selectedCountriesBlackListedDefault:
          phoneFieldFormData.selectedCountriesBlackListedDefault,
      },
    };
    addNewDataFieldHandler(newFieldObject);
    setPhoneFieldFormData({
      label: "",
      type: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      showAllCountries: true,
      showAllCountriesDefault: "",
      selectedCountries: [],
      selectedCountriesDefault: "",
      selectedCountriesBlackListed: true,
      selectedCountriesBlackListedDefault: "",
    });
    toggleFormHandler();
  };

  const editFieldObject = () => {
    let newFieldObject = {
      key: fieldToModifyData.key,
      specs: {
        label: phoneFieldFormData.label,
        placeholder: phoneFieldFormData.placeholder,
        defaultValue: phoneFieldFormData.defaultValue,
        fieldRequired: phoneFieldFormData.fieldRequired,
        showAllCountries: phoneFieldFormData.showAllCountries,
        showAllCountriesDefault: phoneFieldFormData.showAllCountriesDefault,
        selectedCountries: phoneFieldFormData.selectedCountries,
        selectedCountriesDefault: phoneFieldFormData.selectedCountriesDefault,
        selectedCountriesBlackListed:
          phoneFieldFormData.selectedCountriesBlackListed,
        selectedCountriesBlackListedDefault:
          phoneFieldFormData.selectedCountriesBlackListedDefault,
      },
    };
    editDataFieldHandler(newFieldObject);
    setPhoneFieldFormData({
      label: "",
      placeholder: "",
      defaultValue: "",
      fieldRequired: true,
      showAllCountries: true,
      showAllCountriesDefault: "",
      selectedCountries: [],
      selectedCountriesDefault: "",
      selectedCountriesBlackListed: true,
      selectedCountriesBlackListedDefault: "",
    });
    toggleFormHandler();
  };

  const toggleFieldIsRequiredHandler = () => {
    setPhoneFieldFormData((prevState) => {
      return { ...prevState, fieldRequired: !prevState.fieldRequired };
    });
  };

  const allowAllCountriesHandler = () => {
    setPhoneFieldFormData((prevState) => {
      return {
        ...prevState,
        showAllCountries: !prevState.showAllCountries,
      };
    });
  };

  const setShowAllCountriesDefaultHandler = (code) => {
    setPhoneFieldFormData((prevState) => {
      return {
        ...prevState,
        showAllCountriesDefault: code,
      };
    });
  };

  const addSelectedCountriesHandler = (code) => {
    setPhoneFieldFormData((prevState) => {
      return {
        ...prevState,
        selectedCountries: [...prevState.selectedCountries, code],
      };
    });
  };

  const removeSelectedCountriesHandler = (code) => {
    setPhoneFieldFormData((prevState) => {
      let selectedCountriesCp = prevState.selectedCountries;
      return {
        ...prevState,
        selectedCountries: selectedCountriesCp.filter((cntr) => cntr != code),
      };
    });
  };

  const setSelectedCountriesDefaultHandler = (code) => {
    setPhoneFieldFormData((prevState) => {
      return {
        ...prevState,
        selectedCountriesDefault: code,
      };
    });
  };
  const setSelectedCountriesBlackListedDefaultHandler = (code) => {
    setPhoneFieldFormData((prevState) => {
      return {
        ...prevState,
        selectedCountriesBlackListedDefault: code,
      };
    });
  };

  const setSelectedCountriesBlackListedHandler = () => {
    setPhoneFieldFormData((prevState) => {
      return {
        ...prevState,
        selectedCountriesBlackListed: !prevState.selectedCountriesBlackListed,
      };
    });
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
          value={phoneFieldFormData.label}
          onChange={(e) => onChangeMethod(e, "label")}
        />
        {formDataValidation.label && (
          <span className="notValidText">Champ obligatoire *</span>
        )}
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Allow all countries</label>
        <Switcher
          isOn={phoneFieldFormData.showAllCountries}
          handleToggle={allowAllCountriesHandler}
          forId={"showAllCountries"}
        />
      </div>
      {/*HANDLE PHONE COUNTRIES LIST HERE (START)*/}
      {phoneFieldFormData.showAllCountries ? (
        /*HANDLE ALL COUNTRIES*/
        <div className="editorFieldContainer">
          <label className="editorFieldLabel">Select a default country</label>
          <ReactFlagsSelect
            placeholder="Select country"
            searchable={true}
            selected={phoneFieldFormData.showAllCountriesDefault}
            onSelect={(code) => setShowAllCountriesDefaultHandler(code)}
            customLabels={{ ...CustomCountryLabels }}
          />
        </div>
      ) : (
        /*HANDLE COUNTRY SELECTION*/
        <>
          <div className="editorFieldContainer">
            <label className="editorFieldLabel">Add a country the list</label>
            <ReactFlagsSelect
              placeholder="Select a country"
              searchable={true}
              countries={allCountryCodes.filter(
                (cnrt) => !phoneFieldFormData.selectedCountries.includes(cnrt)
              )}
              selected={selectedCountry}
              onSelect={(code) => addSelectedCountriesHandler(code)}
              customLabels={{ ...CustomCountryLabels }}
            />
            {!phoneFieldFormData.selectedCountriesBlackListed && (
              <label className="editorFieldLabel">
                Click on a listed country to make it default
              </label>
            )}
            <PhoneFieldOptionsSelector
              options={phoneFieldFormData.selectedCountries}
              removeOptionHandler={removeSelectedCountriesHandler}
              setSelectedCountriesDefaultHandler={
                setSelectedCountriesDefaultHandler
              }
              selectedCountriesBlackListed={
                phoneFieldFormData.selectedCountriesBlackListed
              }
              selectedCountriesDefault={
                phoneFieldFormData.selectedCountriesDefault
              }
            />
          </div>
          <div className="editorFieldContainer">
            <label className="editorFieldLabel">
              {phoneFieldFormData.selectedCountriesBlackListed
                ? "Blacklist selected countries"
                : "Only show selected countries"}
            </label>
            <Switcher
              isOn={phoneFieldFormData.selectedCountriesBlackListed}
              handleToggle={setSelectedCountriesBlackListedHandler}
              forId={"blackListSelectedCountries"}
            />
          </div>
          {!phoneFieldFormData.showAllCountries &&
            phoneFieldFormData.selectedCountriesBlackListed && (
              <div className="editorFieldContainer">
                <label className="editorFieldLabel">
                  Select a default country
                </label>
                <ReactFlagsSelect
                  placeholder="Select a country"
                  searchable={true}
                  countries={allCountryCodes.filter(
                    (cnrt) =>
                      !phoneFieldFormData.selectedCountries.includes(cnrt)
                  )}
                  selected={
                    phoneFieldFormData.selectedCountriesBlackListedDefault
                  }
                  onSelect={(code) =>
                    setSelectedCountriesBlackListedDefaultHandler(code)
                  }
                  customLabels={{ ...CustomCountryLabels }}
                />
              </div>
            )}
        </>
      )}
      {/*HANDLE PHONE COUNTRIES LIST HERE (STOP)*/}
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Phone field placeholder</label>
        <input
          className={`editorField`}
          type="text"
          placeholder="Choose a phone field placeholder"
          value={phoneFieldFormData.placeholder}
          onChange={(e) => onChangeMethod(e, "placeholder")}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Field is required</label>
        <Switcher
          isOn={phoneFieldFormData.fieldRequired}
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
            (!phoneFieldFormData.showAllCountries &&
              phoneFieldFormData.selectedCountries.length <= 0)
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

export default EditorAddPhoneFieldForm;
