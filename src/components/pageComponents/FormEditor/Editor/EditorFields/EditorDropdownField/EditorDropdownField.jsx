import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions";

function EditorDropdownField({
  fieldKey,
  removeDataFieldHandler,
  specs,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
}) {
  return (
    <div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          {specs.label}
          {specs.fieldRequired && <span className="notValidTextColor"> *</span>}
        </label>
        <select
          className="editorField"
          type={specs.inputType}
          placeholder={specs.placeholder}
          key={specs.defaultValue}
          defaultValue={specs.defaultValue}
        >
          {specs.placeholder.trim() != "" && (
            <option value="" disabled>
              {specs.placeholder}
            </option>
          )}
          {specs.options.map((opt) => {
            return <option key={opt.key}>{opt.text}</option>;
          })}
        </select>
      </div>
      <EditorFieldOptions
        fieldKey={fieldKey}
        removeDataFieldHandler={removeDataFieldHandler}
        setShowFormDisplayer={setShowFormDisplayer}
        setFormDisplayerMode={setFormDisplayerMode}
        setFieldToModifyDataHandler={setFieldToModifyDataHandler}
      />
    </div>
  );
}

export default EditorDropdownField;
