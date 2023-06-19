import React, { useEffect, useState } from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import "./editorPhoneField.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions.jsx";
import ReactFlagsSelect from "react-flags-select";
import Countries from "../../../../../componentsAssets/Countries";
import CustomCountryLabels from "../../../../../componentsAssets/CustomCountryLabels.json";

function EditorPhoneField({
  fieldKey,
  specs,
  removeDataFieldHandler,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
  duplicateField,
  moveFieldUp,
  moveFieldDown,
}) {
  const allCountryCodes = Object.keys(Countries);

  const [allCountriesDefaut, setAllCountriesDefault] = useState(
    specs.showAllCountriesDefault
  );
  const [selectedCountriesDefault, setSelectedCountriesDefault] = useState(
    specs.selectedCountriesDefault
  );
  const [
    selectedCountriesBlackListedDefault,
    setSelectedCountriesBlackListedDefault,
  ] = useState(specs.selectedCountriesBlackListedDefault);
  useEffect(() => {
    setAllCountriesDefault(specs.showAllCountriesDefault);
  }, [specs.showAllCountriesDefault]);
  useEffect(() => {
    setSelectedCountriesDefault(specs.selectedCountriesDefault);
  }, [specs.selectedCountriesDefault]);
  useEffect(() => {
    setSelectedCountriesBlackListedDefault(
      specs.selectedCountriesBlackListedDefault
    );
  }, [specs.selectedCountriesBlackListedDefault]);

  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 15) || ""
    );
  };

  return (
    <div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          {specs.label}
          {specs.fieldRequired && <span className="notValidTextColor"> *</span>}
        </label>
        {specs.showAllCountries ? (
          <>
            <div className="coutriesContainer">
              <ReactFlagsSelect
                placeholder="Select country"
                searchable={true}
                selected={allCountriesDefaut}
                onSelect={(code) => setAllCountriesDefault(code)}
                className="menu-flags"
                selectButtonClassName="menu-flags-button"
                selectedSize={14}
                fullWidth={false}
                customLabels={{ ...CustomCountryLabels }}
              />
              <input
                className="editorField phoneInput"
                type="tel"
                placeholder={specs.placeholder}
                inputMode="numeric"
                autoComplete="cc-number"
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = normalizeCardNumber(value);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="coutriesContainer">
              <ReactFlagsSelect
                placeholder="Select country"
                searchable={true}
                countries={
                  !specs.showAllCountries && specs.selectedCountriesBlackListed
                    ? allCountryCodes.filter(
                        (cnrt) => !specs.selectedCountries.includes(cnrt)
                      )
                    : specs.selectedCountries
                }
                selected={
                  specs.selectedCountriesBlackListed
                    ? selectedCountriesBlackListedDefault
                    : selectedCountriesDefault
                }
                onSelect={(code) => setSelectedCountriesDefault(code)}
                className="menu-flags"
                selectButtonClassName="menu-flags-button"
                selectedSize={14}
                fullWidth={false}
                customLabels={{ ...CustomCountryLabels }}
              />
              <input
                className="editorField phoneInput"
                type="tel"
                placeholder={specs.placeholder}
                key={specs.defaultValue}
                defaultValue={specs.defaultValue}
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = normalizeCardNumber(value);
                }}
              />
            </div>
          </>
        )}
      </div>
      <EditorFieldOptions
        fieldKey={fieldKey}
        removeDataFieldHandler={removeDataFieldHandler}
        setShowFormDisplayer={setShowFormDisplayer}
        setFormDisplayerMode={setFormDisplayerMode}
        setFieldToModifyDataHandler={setFieldToModifyDataHandler}
        duplicateField={duplicateField}
        moveFieldUp={moveFieldUp}
        moveFieldDown={moveFieldDown}
      />
    </div>
  );
}

export default EditorPhoneField;
