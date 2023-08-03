import React, { useState, useEffect } from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions";
import "./editorRadioField.css";

function EditorRadioField({
  fieldKey,
  removeDataFieldHandler,
  specs,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
  duplicateField,
  moveFieldUp,
  moveFieldDown,
}) {
  const [defaultValue, setDefaultValue] = useState(specs.defaultValue);
  useEffect(() => {
    setDefaultValue(specs.defaultValue);
  }, [specs]);
  return (
    <div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          {specs.label}
          {specs.fieldRequired && <span className="notValidTextColor"> *</span>}
        </label>
        <div key={specs.key}>
          {specs.options.map((option, index) => {
            return (
              <div className="checkboxContainer" key={option.key}>
                <label className="editorFieldLabel">{option.value}</label>
                <input
                  type="radio"
                  name={specs.label}
                  value={option.value}
                  checked={defaultValue === option.key ? true : false}
                  onChange={() => setDefaultValue(option.key)}
                />
              </div>
            );
          })}
        </div>
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

export default EditorRadioField;
