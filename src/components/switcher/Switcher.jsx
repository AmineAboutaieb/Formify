import React from "react";
import "./switcher.css";

function Switcher({ isOn, handleToggle, forId }) {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={forId}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "var(--app_accent_color)" }}
        className="react-switch-label"
        htmlFor={forId}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}

export default Switcher;
