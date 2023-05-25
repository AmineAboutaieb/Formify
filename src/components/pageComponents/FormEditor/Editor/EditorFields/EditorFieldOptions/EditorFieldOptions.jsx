import React from "react";
import "./editorFieldOptions.css";
import "../../../../../../styles/sharedEditorFieldStyles.css";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { MoveUp } from "@mui/icons-material";

function EditorFieldOptions({
  fieldKey,
  removeDataFieldHandler,
  setShowFormDisplayer,
  setFormDisplayerMode,
  setFieldToModifyDataHandler,
  duplicateField,
  moveFieldUp,
  moveFieldDown,
}) {
  const showEditFormHandler = () => {
    setFormDisplayerMode("edit");
    setFieldToModifyDataHandler(fieldKey);
    setShowFormDisplayer(true);
  };
  return (
    <div className="editorControlOptions">
      <ContentCopyIcon
        className="editorOptionIcon"
        onClick={() => duplicateField(fieldKey)}
      />

      <EditIcon className="editorOptionIcon" onClick={showEditFormHandler} />
      <DeleteIcon
        className="editorOptionIcon"
        onClick={() => removeDataFieldHandler(fieldKey)}
      />
      <ArrowUpwardIcon
        className="editorOptionIcon"
        onClick={() => moveFieldUp(fieldKey)}
      />
      <ArrowDownwardIcon
        className="editorOptionIcon"
        onClick={() => moveFieldDown(fieldKey)}
      />
    </div>
  );
}

export default EditorFieldOptions;
