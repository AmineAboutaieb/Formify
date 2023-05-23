import React, { useState } from "react";
import "../../../../styles/sharedPageStyles.css";
import "./newFormEditor.css";
import EditorViewer from "../Editor/EditorViewer/EditorViewer";
import EditorAddFieldForm from "../Editor/EditorAddFieldForm/EditorAddFieldForm";

function FormEditor() {
  const [dataFields, setDataFields] = useState([
    // {
    //   key: 1,
    //   type: "text",
    //   specs: {
    //     label: "Full Name",
    //     inputType: "text",
    //     placeholder: "Enter text here",
    //     defaultValue: "Joe Shmo",
    //     fieldRequired: false,
    //   },
    // },
    // {
    //   key: 2,
    //   type: "dropdown",
    //   specs: {
    //     label: "Profession",
    //     options: [
    //       {
    //         key: 1,
    //         text: "opt 1",
    //       },
    //       {
    //         key: 2,
    //         text: "opt 2",
    //       },
    //       {
    //         key: 3,
    //         text: "opt 3",
    //       },
    //     ],
    //     placeholder: "Choose an option",
    //     defaultValue: "opt 3",
    //     fieldRequired: true,
    //   },
    // },
  ]);
  const addNewDataFieldHandler = (fieldObject) => {
    setDataFields([...dataFields, fieldObject]);
  };
  const removeDataFieldHandler = (key) => {
    const updatedFieldsList = dataFields.filter((field) => field.key != key);
    setDataFields(updatedFieldsList);
  };
  return (
    <div className="PageContainer">
      <h4 className="pageTitle">Create a new form</h4>
      <div className="pageContent">
        <EditorAddFieldForm addNewDataFieldHandler={addNewDataFieldHandler} />
        <EditorViewer
          dataFields={dataFields}
          removeDataFieldHandler={removeDataFieldHandler}
        />
      </div>
    </div>
  );
}

export default FormEditor;
