import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/Layout";
import Prenota from "./components/dashboard/Prenota";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./components/dashboard/Profile";
import { useState } from "react";

function App() {
  const [slamTheme, setSlamTheme] = useState("theme-australian");

  return (
    <div className={slamTheme}>
      <Routes>
        <Route path="/" element={<Layout slamTheme={slamTheme} />}>
          <Route index element={<LoginPage setSlamTheme={setSlamTheme} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="prenota" element={<Prenota />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
