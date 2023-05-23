import React from "react";
import "./editorViewer.css";
import EditorTextField from "../EditorFields/EditorTextField/EditorTextField";
import EditorDropdownField from "../EditorFields/EditorDropdownField/EditorDropdownField";

function EditorViewer({ dataFields, removeDataFieldHandler }) {
  return (
    <>
      {dataFields.map((item) => {
        let { key, type, specs } = item;
        if (type == "text") {
          return (
            <EditorTextField
              key={key}
              fieldKey={key}
              specs={specs}
              removeDataFieldHandler={removeDataFieldHandler}
            />
          );
        } else if (type == "dropdown") {
          return (
            <EditorDropdownField
              key={key}
              fieldKey={key}
              specs={specs}
              removeDataFieldHandler={removeDataFieldHandler}
            />
          );
        }
      })}
    </>
  );
}

export default EditorViewer;
