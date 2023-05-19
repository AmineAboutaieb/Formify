import React from "react";
import "../../../../../../../styles/sharedEditorFieldStyles.css";

function EditorAddDropdownFieldForm() {
  return (
    <>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field label</label>
        <input
          className="editorField"
          type="text"
          placeholder="Choose a dropdown field label"
          // defaultValue={specs.defaultValue}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field placeholder</label>
        <input
          className="editorField"
          type="text"
          placeholder="Choose a dropdown field placeholder"
          // defaultValue={specs.defaultValue}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field default value</label>
        <input
          className="editorField"
          type="text"
          placeholder="Choose a dropdown field default value"
          // defaultValue={specs.defaultValue}
        />
      </div>
      <div className="editorFieldContainer">
        <label className="editorFieldLabel">Dropdown field options</label>
        <textarea
          rows={15}
          className="editorField editorFieldArea"
          type="text"
          placeholder="Add dropdown field options (,) comma separated. Example : option 1, option 2, option 3 etc ..."
          // defaultValue={specs.defaultValue}
        />
      </div>
    </>
  );
}

export default EditorAddDropdownFieldForm;
