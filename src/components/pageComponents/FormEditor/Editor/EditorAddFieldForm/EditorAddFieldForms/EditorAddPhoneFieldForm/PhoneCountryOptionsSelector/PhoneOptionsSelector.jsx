import React from "react";
import "../../../../../../../../styles/sharedEditorFieldStyles.css";
import "./phoneOptionsSelector.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CountryCodeToSVG from "../../../../../../../componentsAssets/CountryCodeToSVG/CountryCodeToSVG";
import Countries from "../../../../../../../componentsAssets/Countries.jsx";

function PhoneOptionsSelector({ removeOptionHandler, options }) {
  const getCountryFromCode = (code) => {
    return Countries[code];
  };

  return (
    <>
      <div className="editorField dropdownOptionDisplayer" multiple={true}>
        {options.map((opt) => {
          return (
            <div className="dropdownOptionDisplayerOption" key={opt}>
              <div className="countryLabel">
                <CountryCodeToSVG code={opt} />
                {getCountryFromCode(opt)}
              </div>
              <DeleteIcon
                className="dropdownOptionDisplayerOptionIcon"
                onClick={() => {
                  removeOptionHandler(opt);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PhoneOptionsSelector;
