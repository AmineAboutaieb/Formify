import React from "react";
import "./editorViewer.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditorTextField from "../EditorFields/EditorTextField/EditorTextField";
import EditorDropdownField from "../EditorFields/EditorDropdownField/EditorDropdownField";
import EditorEmailField from "../EditorFields/EditorEmailField/EditorEmailField";
import EditorPasswordField from "../EditorFields/EditorPasswordField/EditorPasswordField";
import EditorNumberField from "../EditorFields/EditorNumberField/EditorNumberField";
import EditorPhoneField from "../EditorFields/EditorPhoneField/EditorPhoneField";

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
  const [listRef] = useAutoAnimate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={formSubmitHandler} ref={listRef}>
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
        } else if (type === "number") {
          return (
            <EditorNumberField
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
        } else if (type === "phone") {
          return (
            <EditorPhoneField
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
