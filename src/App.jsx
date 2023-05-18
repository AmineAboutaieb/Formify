import { useState } from "react";
import "./styles/app.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import PageRoutes from "./components/routes/PageRoutes";
import PageWrapper from "./components/PageWrapper/PageWrapper";

function App() {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div className="globalContainer">
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="mainContainer">
        <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <PageWrapper>
          <PageRoutes />
        </PageWrapper>
      </div>
    </div>
  );
}

export default App;
