import { useState } from "react";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="globalContainer">
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="mainContainer">
        <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      </div>
    </div>
  );
}

export default App;
