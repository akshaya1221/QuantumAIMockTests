import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

type DashboardNavItem =
  | { label: string; to: string }
  | { label: string; action: "chatbot" };

const dashboardNavItems: DashboardNavItem[] = [
 { label: "Dashboard", to: "/dashboard" },
  { label: "My Courses", to: "/dashboard/courses" },
  { label: "Mock Tests", to: "/dashboard/mock-tests" },
  { label: "Doubt Solver", action: "chatbot" },
  { label: "Adaptive Planner", to: "/dashboard/adaptive-planner" },
  { label: "Concept Library", to: "/dashboard/study-materials" },
  { label: "Rank Predictor", to: "/dashboard/rank-predictor" },
  { label: "AI Coaching", to: "/dashboard/ai-coaching" },
  { label: "Study Materials", to: "/dashboard/study-materials" },
  { label: "Profile", to: "/dashboard/profile" },
];

function DashboardNavbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  }

  function openChatbot() {
    window.dispatchEvent(new Event("open-chatbot"));
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
            "action" in item ? (
              <button
                key={item.label}
                type="button"
                className="dashboard-nav-link-button"
                onClick={openChatbot}
              >
                {item.label}
              </button>
            ) : item.to.startsWith("#") || item.to.includes("#") ? (
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
