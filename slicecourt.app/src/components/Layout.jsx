// src/components/Layout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BsHouseDoorFill, BsCalendarCheckFill, BsPersonCircle } from "react-icons/bs";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

const Layout = ({ slamTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navItems = [
    { icon: <BsHouseDoorFill size={16} />, label: "Home", path: "/dashboard" },
    { icon: <BsCalendarCheckFill size={16} />, label: "Prenota", path: "/prenota" },
    { icon: <BsPersonCircle size={16} />, label: "Profilo", path: "/profile" },
  ];

  return (
    <div className={slamTheme}>
      <Outlet />

      {/* Navbar mobile visibile solo su dispositivi piccoli */}
      <Container className="d-md-none border-top shadow-sm mobile-navbar" style={{ zIndex: 1050 }}>
        <div className="d-flex justify-content-around py-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className="btn btn-link d-flex flex-column align-items-center text-dark"
              onClick={() => navigate(item.path)}
              style={{
                textDecoration: "none",
                fontSize: "0.65rem",
                padding: "2px",
                gap: "2px",
                lineHeight: "1.1",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Layout;
