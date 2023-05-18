import React from "react";
import "./pageWrapper.css";

function PageWrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}

export default PageWrapper;
