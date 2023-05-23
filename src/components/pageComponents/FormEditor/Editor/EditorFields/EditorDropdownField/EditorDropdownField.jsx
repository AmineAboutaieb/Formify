import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions";

function EditorDropdownField({ fieldKey, removeDataFieldHandler, specs }) {
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
          defaultValue={specs.defaultValue}
        >
          {specs.options.map((opt) => {
            return <option key={opt.key}>{opt.text}</option>;
          })}
        </select>
      </div>
      <EditorFieldOptions
        fieldKey={fieldKey}
        removeDataFieldHandler={removeDataFieldHandler}
      />
    </div>
  );
}

export default EditorDropdownField;
