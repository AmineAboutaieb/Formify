import React from "react";
import "./editorViewer.css";
import EditorTextField from "../EditorFields/EditorTextField/EditorTextField";
import EditorDropdownField from "../EditorFields/EditorDropdownField/EditorDropdownField";
import EditorEmailField from "../EditorFields/EditorEmailField/EditorEmailField";
import EditorPasswordField from "../EditorFields/EditorPasswordField/EditorPasswordField";

function EditorViewer({
  dataFields,
  removeDataFieldHandler,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
  duplicateField,
  moveFieldUp,
  moveFieldDown,
}) {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      {dataFields.map((item) => {
        let { key, type, specs } = item;
        if (type == "text") {
          return (
            <EditorTextField
              key={key}
              fieldKey={key}
              specs={specs}
              removeDataFieldHandler={removeDataFieldHandler}
              setShowFormDisplayer={setShowFormDisplayer}
              setFormDisplayerMode={setFormDisplayerMode}
              setFieldToModifyDataHandler={setFieldToModifyDataHandler}
              duplicateField={duplicateField}
              moveFieldUp={moveFieldUp}
              moveFieldDown={moveFieldDown}
            />
          );
        } else if (type == "dropdown") {
          return (
            <EditorDropdownField
              key={key}
              fieldKey={key}
              specs={specs}
              removeDataFieldHandler={removeDataFieldHandler}
              setShowFormDisplayer={setShowFormDisplayer}
              setFormDisplayerMode={setFormDisplayerMode}
              setFieldToModifyDataHandler={setFieldToModifyDataHandler}
              duplicateField={duplicateField}
              moveFieldUp={moveFieldUp}
              moveFieldDown={moveFieldDown}
            />
          );
        } else if (type === "email") {
          return (
            <EditorEmailField
              key={key}
              fieldKey={key}
              specs={specs}
              removeDataFieldHandler={removeDataFieldHandler}
              setShowFormDisplayer={setShowFormDisplayer}
              setFormDisplayerMode={setFormDisplayerMode}
              setFieldToModifyDataHandler={setFieldToModifyDataHandler}
              duplicateField={duplicateField}
              moveFieldUp={moveFieldUp}
              moveFieldDown={moveFieldDown}
            />
          );
        } else if (type === "password") {
          return (
            <EditorPasswordField
              key={key}
              fieldKey={key}
              specs={specs}
              removeDataFieldHandler={removeDataFieldHandler}
              setShowFormDisplayer={setShowFormDisplayer}
              setFormDisplayerMode={setFormDisplayerMode}
              setFieldToModifyDataHandler={setFieldToModifyDataHandler}
              duplicateField={duplicateField}
              moveFieldUp={moveFieldUp}
              moveFieldDown={moveFieldDown}
            />
          );
        }
      })}
    </form>
  );
}

export default EditorViewer;
