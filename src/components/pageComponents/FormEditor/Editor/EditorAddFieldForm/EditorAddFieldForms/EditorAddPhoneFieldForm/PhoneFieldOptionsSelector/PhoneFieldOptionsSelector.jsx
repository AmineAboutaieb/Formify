import React, { useState } from "react";
import "../../../../../../../../styles/sharedEditorFieldStyles.css";
import "./phoneFieldOptionsSelector.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CountryCodeToSVG from "../../../../../../../componentsAssets/CountryCodeToSVG/CountryCodeToSVG";
import CountryDialCodes from "../../../../../../../componentsAssets/CountriesCodes";

function PhoneFieldOptionsSelector({
  removeOptionHandler,
  options,
  setSelectedCountriesDefaultHandler,
  selectedCountriesBlackListed,
  selectedCountriesDefault,
}) {
  const getDialCodeFromCode = (code) => {
    return CountryDialCodes.filter((cntr) => cntr.code === code)[0]?.dial_code;
  };
  const getCountryNameFromCode = (code) => {
    return CountryDialCodes.filter((cntr) => cntr.code === code)[0]?.name;
  };
  const setSelectedCountriesDefault = (code) => {
    if (!selectedCountriesBlackListed) {
      setSelectedCountriesDefaultHandler(code);
    }
  };
  return (
    <>
      <div className="editorField dropdownOptionDisplayer" multiple={true}>
        {options.map((cntr) => {
          return (
            <div
              className="dropdownOptionDisplayerOption"
              key={cntr}
              id={cntr}
              value={cntr}
            >
              <div
                className={`selectecCountriesContainer ${
                  !selectedCountriesBlackListed ? "hoverableCountry" : ""
                }`}
                onClick={() => setSelectedCountriesDefault(cntr)}
              >
                <CountryCodeToSVG code={cntr} />
                <span>{`(${getDialCodeFromCode(cntr)})`}</span>
                <span
                  className={
                    selectedCountriesDefault === cntr &&
                    !selectedCountriesBlackListed
                      ? "defaultSelectedCountry"
                      : ""
                  }
                >
                  {getCountryNameFromCode(cntr)}
                </span>
              </div>
              <DeleteIcon
                className="dropdownOptionDisplayerOptionIcon"
                onClick={() => {
                  removeOptionHandler(cntr);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PhoneFieldOptionsSelector;
