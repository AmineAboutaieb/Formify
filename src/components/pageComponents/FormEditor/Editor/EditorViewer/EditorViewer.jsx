import React from "react";
import "./editorViewer.css";
import EditorTextField from "../EditorFields/EditorTextField/EditorTextField";
import EditorDropdownField from "../EditorFields/EditorDropdownField/EditorDropdownField";

function EditorViewer({ dataFields }) {
  return (
    <>
      {dataFields.map((item) => {
        let { key, type, specs } = item;
        if (type == "text") {
          return <EditorTextField key={key} specs={specs} />;
        } else if (type == "dropdown") {
          return <EditorDropdownField key={key} specs={specs} />;
        }
      })}
    </>
  );
}

export default EditorViewer;
