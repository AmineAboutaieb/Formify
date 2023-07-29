import React, { useState } from "react";
import "../../../../../../../../styles/sharedEditorFieldStyles.css";
import "./checkboxOptionsSelector.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuidv4, v4 } from "uuid";

function CheckboxOptionsSelector({
  addNewOptionHandler,
  removeOptionHandler,
  options,
  checkboxNameGroup,
  ToggleSetDefaultCheckbox,
  defaultsArray,
}) {
  const [optionInput, setOptionInput] = useState("");
  const [optionInputValidation, setOptionInputValidation] = useState(false);
  const onChangeMethod = (e) => {
    setOptionInput(e.target.value);
    if (e.target.value != "" && e.target.value.trim() != "") {
      setOptionInputValidation(false);
    }
  };
  const addOptionHandler = () => {
    if (optionInput === "" || optionInput.trim() === "") {
      setOptionInputValidation(true);
    } else {
      setOptionInputValidation(false);
      let newOption = { key: v4(), value: optionInput };
      addNewOptionHandler(newOption);
      setOptionInput("");
    }
  };
  return (
    <>
      <div className="checkboxOptionSelectorContainer">
        <input
          className={`editorField ${
            optionInputValidation ? "notValidFormElement" : ""
          }`}
          type="text"
          placeholder="Add an option"
          value={optionInput}
          onChange={onChangeMethod}
        />
        <IconButton
          aria-label="delete"
          className="plusIcon"
          sx={{ backgroundColor: "var(--app_accent_color)" }}
          onClick={addOptionHandler}
        >
          <AddIcon />
        </IconButton>
      </div>
      <label className="editorFieldLabel defaultCheckboxSelector">
        Click on a listed option to make it checked by default
      </label>
      {optionInputValidation && (
        <span className="notValidText">Champ obligatoire *</span>
      )}
      <div className="editorField checkboxOptionDisplayer" multiple={true}>
        {options.map((opt) => {
          return (
            <div
              className="checkboxOptionDisplayerOption"
              key={opt.key}
              id={opt.key}
              value={opt.value}
            >
              <div className="checkboxLabelCheckboxContainer">
                <label
                  onClick={() => ToggleSetDefaultCheckbox(opt.key)}
                  className={
                    defaultsArray.includes(opt.key)
                      ? "defaultSelectedCheckbox"
                      : ""
                  }
                >
                  {opt.value}
                </label>
                <input
                  type="checkbox"
                  value={opt.value}
                  name={checkboxNameGroup}
                  checked={defaultsArray.includes(opt.key) ? true : false}
                  onChange={() => {}}
                />
              </div>
              <DeleteIcon
                className="checkboxOptionDisplayerOptionIcon"
                onClick={() => {
                  removeOptionHandler(opt.key);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CheckboxOptionsSelector;
