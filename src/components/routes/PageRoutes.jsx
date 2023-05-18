import React from "react";
import Home from "../pageComponents/Home/Home";
import NewFormEditor from "../pageComponents/FormEditor/NewFormEditor/NewFormEditor";
import PageNotFound from "../pageComponents/PageNotFound/PageNotFound";
import { Routes, Route } from "react-router-dom";

function PageRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="new-form-editor" element={<NewFormEditor />} />
      <Route path="*" element={<PageNotFound />} />
      <Route />
    </Routes>
  );
}

export default PageRoutes;
