import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";

function EditorDropdownField({ specs }) {
  return (
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
  );
}

export default EditorDropdownField;
