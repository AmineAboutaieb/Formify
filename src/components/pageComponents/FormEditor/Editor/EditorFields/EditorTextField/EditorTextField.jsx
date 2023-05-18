import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";

function EditorTextField({ specs }) {
  return (
    <div className="editorFieldContainer">
      <label className="editorFieldLabel">{specs.label}</label>
      <input
        className="editorField"
        type={specs.inputType}
        placeholder={specs.placeholder}
        defaultValue={specs.defaultValue}
      />
    </div>
  );
}

export default EditorTextField;
