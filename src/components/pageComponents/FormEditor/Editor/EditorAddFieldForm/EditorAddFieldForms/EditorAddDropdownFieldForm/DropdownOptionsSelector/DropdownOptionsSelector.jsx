import React, { useState } from "react";
import "../../../../../../../../styles/sharedEditorFieldStyles.css";
import "./dropdownOptionsSelector.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuidv4, v4 } from "uuid";

function DropdownOptionsSelector({
  addNewOptionHandler,
  removeOptionHandler,
  options,
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
      let newOption = { key: v4(), text: optionInput };
      addNewOptionHandler(newOption);
      setOptionInput("");
    }
  };
  const selectHandler = (e) => {
    console.log(e.target.getAttribute("id"));
  };
  return (
    <>
      <div className="dropdownOptionSelectorContainer">
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
      {optionInputValidation && (
        <span className="notValidText">Champ obligatoire *</span>
      )}
      <div className="editorField dropdownOptionDisplayer" multiple={true}>
        {options.map((opt) => {
          return (
            <div
              className="dropdownOptionDisplayerOption"
              key={opt.key}
              id={opt.key}
              value={opt.text}
              onClick={selectHandler}
            >
              <p>{opt.text}</p>
              <DeleteIcon
                className="dropdownOptionDisplayerOptionIcon"
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

export default DropdownOptionsSelector;
