import React from "react";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import EditorFieldOptions from "../EditorFieldOptions/EditorFieldOptions.jsx";

function EditorPasswordField({
  fieldKey,
  specs,
  removeDataFieldHandler,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
  duplicateField,
  moveFieldUp,
  moveFieldDown,
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
          type="password"
          placeholder={specs.placeholder}
          key={specs.defaultValue}
          defaultValue={specs.defaultValue}
          required={specs.fieldRequired}
          minLength={specs.minLength}
          maxLength={specs.maxLength}
        />
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

export default EditorPasswordField;
