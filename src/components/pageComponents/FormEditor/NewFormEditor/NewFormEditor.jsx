import React, { useState } from "react";
import "../../../../styles/sharedPageStyles.css";
import "./newFormEditor.css";
import EditorViewer from "../Editor/EditorViewer/EditorViewer";
import EditorAddFieldForm from "../Editor/EditorAddFieldForm/EditorAddFieldForm";
import EditorFormDisplayer from "../Editor/EditorAddFieldForm/EditorFormDisplayer/EditorFormDisplayer";
import { v4 } from "uuid";

function FormEditor() {
  const [dataFields, setDataFields] = useState([
    {
      key: "57e49aca-999b-4f14-b401-3b2d0cb12c22",
      type: "text",
      specs: {
        label: "First name",
        placeholder: "Your first name (required)",
        defaultValue: "",
        fieldRequired: true,
      },
    },
    {
      key: "65df7820-45b7-4113-8985-073ddccab112",
      type: "text",
      specs: {
        label: "Last name",
        placeholder: "Your last name (required)",
        defaultValue: "",
        fieldRequired: true,
      },
    },
    {
      key: "1fe37a7e-e87d-43ee-ace4-ec1db5b91f71",
      type: "dropdown",
      specs: {
        label: "Gender",
        options: [
          { key: 1, text: "Male" },
          { key: 2, text: "Female" },
        ],
        placeholder: "Your gender (required)",
        defaultValue: "",
        fieldRequired: true,
      },
    },
  ]);
  const [showFormDisplayer, setShowFormDisplayer] = useState(false);
  const [formDisplayerMode, setFormDisplayerMode] = useState("add");
  const [fieldToModifyData, setFieldToModifyData] = useState(null);

  const addNewDataFieldHandler = (fieldObject) => {
    setDataFields([...dataFields, fieldObject]);
  };
  const editDataFieldHandler = (fieldObject) => {
    let objectIndex = dataFields.findIndex((f) => f.key === fieldObject.key);
    let newList = [...dataFields];
    if (objectIndex != -1) {
      let newList = dataFields;
      newList[objectIndex].specs = fieldObject.specs;
      setDataFields([...newList]);
    }
  };
  const removeDataFieldHandler = (key) => {
    const updatedFieldsList = dataFields.filter((field) => field.key != key);
    setDataFields(updatedFieldsList);
  };

  const duplicateField = (key) => {
    let objectIndex = dataFields.findIndex((f) => f.key === key);
    let duplicate = { ...dataFields[objectIndex] };
    duplicate.key = v4();
    addNewDataFieldHandler(duplicate);
  };

  const setFieldToModifyDataHandler = (key) => {
    setFieldToModifyData(dataFields.filter((item) => item.key === key)[0]);
  };

  const moveFieldUp = (key) => {
    const fieldToMoveIndex = dataFields.findIndex((f) => f.key === key);
    if (fieldToMoveIndex > 0) {
      let newList = [...dataFields];
      let item = newList.splice(fieldToMoveIndex, 1)[0];
      newList.splice(fieldToMoveIndex - 1, 0, item);
      setDataFields([...newList]);
    }
  };
  const moveFieldDown = (key) => {
    const fieldToMoveIndex = dataFields.findIndex((f) => f.key === key);
    if (fieldToMoveIndex < dataFields.length - 1) {
      let newList = [...dataFields];
      let item = newList.splice(fieldToMoveIndex, 1)[0];
      newList.splice(fieldToMoveIndex + 1, 0, item);
      setDataFields([...newList]);
    }
  };

  return (
    <div className="PageContainer">
      <h4 className="pageTitle">Create a new form</h4>
      <div className="pageContent">
        <EditorAddFieldForm
          setShowFormDisplayer={setShowFormDisplayer}
          setFormDisplayerMode={setFormDisplayerMode}
        />
        {showFormDisplayer && (
          <EditorFormDisplayer
            setShowFormDisplayer={setShowFormDisplayer}
            addNewDataFieldHandler={addNewDataFieldHandler}
            formDisplayerMode={formDisplayerMode}
            fieldToModifyData={fieldToModifyData}
            editDataFieldHandler={editDataFieldHandler}
          />
        )}
        <EditorViewer
          dataFields={dataFields}
          removeDataFieldHandler={removeDataFieldHandler}
          setShowFormDisplayer={setShowFormDisplayer}
          setFormDisplayerMode={setFormDisplayerMode}
          setFieldToModifyDataHandler={setFieldToModifyDataHandler}
          duplicateField={duplicateField}
          moveFieldUp={moveFieldUp}
          moveFieldDown={moveFieldDown}
        />
      </div>
    </div>
  );
}

export default FormEditor;
