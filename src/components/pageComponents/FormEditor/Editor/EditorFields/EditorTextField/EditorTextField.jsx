import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions.jsx";

function EditorTextField({
  fieldKey,
  specs,
  removeDataFieldHandler,
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
        <input
          className="editorField"
          type={specs.inputType}
          placeholder={specs.placeholder}
          key={specs.defaultValue}
          defaultValue={specs.defaultValue}
        />
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

export default EditorTextField;
