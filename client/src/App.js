import { Routes, Route } from "react-router-dom";
import CollapsibleExample from "./Components/Common/Navbar";
import UserData from "./Components/Pages/UserData";
import Login from "./Components/Pages/Login";
import Update from "./Components/Pages/Update";
import SignUp from "./Components/Pages/SignUp";
import videoBg from "./Components/Assets/Images/bgvid.mp4";
import "./Components/Assets/Styles/bgvid.css";
import "./index.css";
import Notfound from "./Components/Common/Notfound";

function App() {
  return (
    <>
      <div className="main">
        <video src={videoBg} autoPlay loop muted />
        <div className="contents">
          <CollapsibleExample />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<UserData />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/update" element={<Update />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
