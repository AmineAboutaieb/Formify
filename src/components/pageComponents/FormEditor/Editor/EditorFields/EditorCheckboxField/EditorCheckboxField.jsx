import React, { useState, useEffect } from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions";
import "./editorCheckboxField.css";

function EditorCheckboxField({
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
  const [options, setOptions] = useState([
    ...specs.options.map((item) => {
      return {
        key: item.key,
        checked: specs.defaultValue.includes(item.key) ? true : false,
      };
    }),
  ]);
  useEffect(() => {
    setOptions([
      ...specs.options.map((item) => {
        return {
          key: item.key,
          checked: specs.defaultValue.includes(item.key) ? true : false,
        };
      }),
    ]);
  }, [specs]);
  const handleCheckboxChange = (position) => {
    const newOptions = options.map((item, index) =>
      index === position ? { ...item, checked: !item.checked } : item
    );
    setOptions([...newOptions]);
  };
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
                  type="checkbox"
                  name={specs.label}
                  value={option.value}
                  checked={
                    options[index]?.checked === true ||
                    options[index]?.checked === false
                      ? options[index]?.checked
                      : false
                  }
                  onChange={() => handleCheckboxChange(index)}
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

export default EditorCheckboxField;
