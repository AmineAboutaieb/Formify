import React, { useEffect } from "react";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import CustomCountryLabels from "../../componentsAssets/CustomCountryLabels.json";
import CountriesCodes from "../../componentsAssets/CountriesCodes";

function TestFormViewer() {
  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 15) || ""
    );
  };

  const getDialCode = (code) => {
    let dialCode = "##";
    CountriesCodes.map((cntr) => {
      if (cntr.code === code) {
        dialCode = cntr.dial_code;
      }
    });
    return dialCode;
  };

  const [fields, setFields] = useState([
    {
      key: "57e49aca-999b-4f14-b401-3b2d0cb12c22",
      type: "text",
      specs: {
        label: "First name",
        placeholder: "Your first name (required)",
        defaultValue: "",
        fieldRequired: true,
      },
    },
    {
      key: "65df7820-45b7-4113-8985-073ddccab112",
      type: "text",
      specs: {
        label: "Last name",
        placeholder: "Your last name (required)",
        defaultValue: "",
        fieldRequired: true,
      },
    },
    {
      key: "1fe37a7e-e87d-43ee-ace4-ec1db5b91f71",
      type: "dropdown",
      specs: {
        label: "Gender",
        options: [
          { key: 1, text: "Male" },
          { key: 2, text: "Female" },
        ],
        placeholder: "Your gender (required)",
        defaultValue: "Female",
        fieldRequired: true,
      },
    },
    {
      key: "3ddd9e3f-1685-4b6a-bc8d-fa88856712e5",
      type: "phone",
      specs: {
        label: "Phone",
        placeholder: "",
        defaultValue: "",
        fieldRequired: true,
        showAllCountries: true,
        showAllCountriesDefault: "AF",
        selectedCountries: ["AF", "DZ", "AL"],
        selectedCountriesDefault: "",
        selectedCountriesBlackListed: true,
        selectedCountriesBlackListedDefault: "",
      },
    },
  ]);

  let staticState = {};
  let validationState = {};

  fields.map((field, index) => {
    if (field.type === "phone") {
      staticState[field.key] = {
        key: field.key,
        label: field.specs.label,
        value: field.specs.defaultValue,
        countryCode: field.specs.showAllCountries
          ? field.specs.showAllCountriesDefault
          : field.specs.selectedCountriesBlackListed
          ? field.specs.selectedCountriesBlackListedDefault
          : field.specs.selectedCountriesDefault,
        type: field.type,
      };
    } else {
      staticState[field.key] = {
        key: field.key,
        label: field.specs.label,
        value: field.specs.defaultValue,
        type: field.type,
      };
    }
    validationState[field.key] = false;
  });

  const [formData, setFormData] = useState(staticState);
  const [formValidation, setFormValidation] = useState(validationState);

  const detectValidation = (key, value) => {
    if (value.trim().length <= 0) {
      formValidation[key] = true;
    } else {
      formValidation[key] = false;
    }
  };

  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        let submitObject = {};
        for (let key in formData) {
          if (formData[key].type === "phone") {
            submitObject[formData[key].label] = `(${getDialCode(
              formData[key].countryCode
            )}) ${formData[key].value}`;
          } else {
            submitObject[formData[key].label] = formData[key].value;
          }
        }
        console.log(submitObject);
      }}
    >
      {fields.map((field, index) => {
        return (
          <div key={field.key}>
            {field.type === "text" && (
              <>
                <label htmlFor="">{field.specs.label}</label>
                <input
                  type="text"
                  placeholder={field.specs.placeholder}
                  required={field.specs.fieldRequired}
                  value={formData[field.key].value}
                  onChange={(e) => {
                    detectValidation(field.key, e.target.value);
                    setFormData((prevState) => {
                      return {
                        ...prevState,
                        [field.key]: {
                          ...prevState[field.key],
                          value: e.target.value,
                        },
                      };
                    });
                  }}
                />
                {field.specs.fieldRequired && formValidation[field.key] ? (
                  <p>Field is required !</p>
                ) : (
                  <></>
                )}
              </>
            )}
            {field.type === "dropdown" && (
              <>
                <label>{field.specs.label}</label>
                <select
                  value={formData[field.key].value}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      [field.key]: {
                        ...prevState[field.key],
                        value: e.target.value,
                      },
                    }));
                  }}
                >
                  {field.specs.options.map((item, index) => {
                    return (
                      <option key={item.key} value={item.text}>
                        {item.text}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
            {field.type === "phone" && (
              <>
                <label htmlFor="">{field.specs.label}</label>
                {/* {field.specs.showAllCountries && (
                  <>
                    <div className="coutriesContainer">
                      <ReactFlagsSelect
                        placeholder="Select country"
                        searchable={true}
                        selected={}
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
                )} */}
                <ReactFlagsSelect
                  placeholder="Select country"
                  searchable={true}
                  selected={formData[field.key].countryCode}
                  countries={
                    !field.specs.showAllCountries &&
                    field.specs.selectedCountries
                  }
                  blacklistCountries={
                    !field.specs.showAllCountries &&
                    field.specs.selectedCountriesBlackListed
                      ? true
                      : false
                  }
                  onSelect={(code) => {
                    setFormData((prevState) => {
                      return {
                        ...prevState,
                        [field.key]: {
                          ...prevState[field.key],
                          countryCode: code,
                        },
                      };
                    });
                  }}
                  className="menu-flags"
                  selectButtonClassName="menu-flags-button"
                  selectedSize={14}
                  fullWidth={false}
                  customLabels={{ ...CustomCountryLabels }}
                />
                <input
                  type="tel"
                  placeholder={field.specs.placeholder}
                  required={field.specs.fieldRequired}
                  value={formData[field.key].value}
                  onChange={(e) => {
                    detectValidation(field.key, e.target.value);
                    setFormData((prevState) => {
                      return {
                        ...prevState,
                        [field.key]: {
                          ...prevState[field.key],
                          value: normalizeCardNumber(e.target.value),
                        },
                      };
                    });
                  }}
                />
                {field.specs.fieldRequired && formValidation[field.key] ? (
                  <p>Field is required !</p>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        );
      })}
      <button>submit</button>
    </form>
  );
}

export default TestFormViewer;
