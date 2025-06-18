import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/Layout";
import Prenota from "./components/dashboard/Prenota";
import Profile from "./components/dashboard/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const slamTheme = useSelector((state) => state.theme.slamTheme);

  return (
    <div className={slamTheme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prenota" element={<Prenota />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
