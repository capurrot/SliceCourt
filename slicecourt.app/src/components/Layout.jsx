import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BsHouseDoorFill, BsCalendarCheckFill, BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";

const Layout = ({ slamTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const navItems = [
    { icon: <BsHouseDoorFill size={16} />, label: "Home", path: "/dashboard" },
    { icon: <BsCalendarCheckFill size={16} />, label: "Prenota", path: "/prenota" },
    { icon: <BsPersonCircle size={16} />, label: "Profilo", path: "/profile" },
    {
      icon: <FiLogOut size={16} />,
      label: "Logout",
      action: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];

  return (
    <div className={slamTheme}>
      <Outlet />

      <Container className="d-md-none border-top shadow-sm mobile-navbar" style={{ zIndex: 1050 }}>
        <div className="d-flex justify-content-around py-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className="btn btn-link d-flex flex-column align-items-center text-dark"
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  navigate(item.path);
                }
              }}
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
