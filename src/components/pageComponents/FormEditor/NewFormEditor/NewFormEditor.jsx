import React, { useEffect, useState } from "react";
import "../../../../styles/sharedPageStyles.css";
import "./newFormEditor.css";
import EditorViewer from "../Editor/EditorViewer/EditorViewer";
import EditorAddFieldForm from "../Editor/EditorAddFieldForm/EditorAddFieldForm";
import EditorFormDisplayer from "../Editor/EditorAddFieldForm/EditorFormDisplayer/EditorFormDisplayer";

function FormEditor() {
  const [dataFields, setDataFields] = useState([]);
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
  const setFieldToModifyDataHandler = (key) => {
    setFieldToModifyData(dataFields.filter((item) => item.key === key)[0]);
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
        />
      </div>
    </div>
  );
}

export default FormEditor;
