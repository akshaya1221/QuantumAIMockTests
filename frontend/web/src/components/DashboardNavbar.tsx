import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const dashboardNavItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "My Courses", to: "/courses" },
  { label: "Mock Tests", to: "/mock-test" },
  { label: "AI Tutor", to: "/ai-tutor" },
  { label: "AI Coaching", to: "/#agents" },
  { label: "Study Materials", to: "/study-materials" },
  { label: "Rank Predictor", to: "/rank-predictor" },
  { label: "Results", to: "/results" },
  { label: "Profile", to: "#profile" },
];

function DashboardNavbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  }

  return (
    <header className="dashboard-navbar">
      <nav className="dashboard-nav-inner" aria-label="Student dashboard navigation">
        <Link to="/dashboard" className="brand" aria-label="VALLURI dashboard">
          <img src={logo} alt="VALLURI logo" className="brand-logo-img" />
          <span className="brand-text">
            <span className="brand-name">
              VALLURI<sup>TM</sup>
            </span>
            <span className="brand-subtitle">IIT-JEE</span>
          </span>
        </Link>

        <div className="dashboard-nav-links">
          {dashboardNavItems.map((item) =>
            item.to.startsWith("#") || item.to.includes("#") ? (
              <a href={item.to} key={item.label}>
                {item.label}
              </a>
            ) : (
              <NavLink to={item.to} key={item.label}>
                {item.label}
              </NavLink>
            ),
          )}
        </div>

        <button type="button" className="get-started-btn" onClick={logout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default DashboardNavbar;
