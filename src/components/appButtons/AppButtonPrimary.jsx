import React from "react";
import Button from "@mui/material/Button";
import "./appButtons.css";

function AppButtonPrimary({ text, disabled, clickHandler }) {
  return (
    <Button
      variant="contained"
      color="success"
      disabled={disabled}
      className="appButton appButtonPrimary"
      sx={{ backgroundColor: "var(--app_accent_color)" }}
      onClick={clickHandler}
    >
      {text}
    </Button>
  );
}

export default AppButtonPrimary;
