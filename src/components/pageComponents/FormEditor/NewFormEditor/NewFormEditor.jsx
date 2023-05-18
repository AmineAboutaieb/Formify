import React, { useState } from "react";
import "../../../../styles/sharedPageStyles.css";
import "./newFormEditor.css";
import EditorViewer from "../Editor/EditorViewer/EditorViewer";

function FormEditor() {
  const [dataFields, setDataFields] = useState([
    {
      key: 1,
      type: "text",
      specs: {
        label: "Full Name",
        inputType: "text",
        placeholder: "Enter text here",
        defaultValue: "Joe Shmo",
      },
    },
    {
      key: 2,
      type: "dropdown",
      specs: {
        label: "Profession",
        options: [
          {
            key: 1,
            text: "opt 1",
          },
          {
            key: 2,
            text: "opt 2",
          },
          {
            key: 3,
            text: "opt 3",
          },
        ],
        placeholder: "Choose an option",
        defaultValue: "opt 3",
      },
    },
  ]);
  return (
    <div className="PageContainer">
      <h4 className="pageTitle">Create a new form</h4>
      <div className="pageContent">
        <EditorViewer dataFields={dataFields} />
      </div>
    </div>
  );
}

export default FormEditor;
