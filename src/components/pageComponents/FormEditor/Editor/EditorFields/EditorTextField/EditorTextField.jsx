import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions.jsx";

function EditorTextField({ fieldKey, specs, removeDataFieldHandler }) {
  return (
    <div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">
          {specs.label}
          {specs.fieldRequired && <span className="notValidTextColor"> *</span>}
        </label>
        <input
          className="editorField"
          type={specs.inputType}
          placeholder={specs.placeholder}
          defaultValue={specs.defaultValue}
        />
      </div>
      <EditorFieldOptions
        fieldKey={fieldKey}
        removeDataFieldHandler={removeDataFieldHandler}
      />
    </div>
  );
}

export default EditorTextField;
