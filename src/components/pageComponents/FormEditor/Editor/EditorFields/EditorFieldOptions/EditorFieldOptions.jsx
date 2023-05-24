import React from "react";
import "./editorFieldOptions.css";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function EditorFieldOptions({
  fieldKey,
  removeDataFieldHandler,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
}) {
  const showEditFormHandler = () => {
    setFormDisplayerMode("edit");
    setFieldToModifyDataHandler(fieldKey);
    setShowFormDisplayer(true);
  };
  return (
    <div className="editorControlOptions">
      <EditIcon className="editorOptionIcon" onClick={showEditFormHandler} />
      <DeleteIcon
        className="editorOptionIcon"
        onClick={() => removeDataFieldHandler(fieldKey)}
      />
      <ContentCopyIcon className="editorOptionIcon" />
    </div>
  );
}

export default EditorFieldOptions;
