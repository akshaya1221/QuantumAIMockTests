import type { ReactElement } from "react";
import ChatbotWidget from "./components/ChatbotWidget";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MockTest from "./pages/MockTest";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pricing from "./pages/Pricing";
import RankPredictor from "./pages/RankPredictor";
import Results from "./pages/Results";
import RefundCancellation from "./pages/RefundCancellation";
import ShippingPolicy from "./pages/ShippingPolicy";
import StudyMaterials from "./pages/StudyMaterials";
import TermsAndConditions from "./pages/TermsAndConditions";
import Contact from "./pages/Contact";
import CookiePolicy from "./pages/CookiePolicy";
import Courses from "./pages/Courses";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppShell() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="app">
      {!isDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mock-tests"
          element={
            <ProtectedRoute>
              <MockTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/rank-predictor"
          element={
            <ProtectedRoute>
              <RankPredictor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/study-materials"
          element={
            <ProtectedRoute>
              <StudyMaterials />
            </ProtectedRoute>
          }
        />
        <Route path="/mock-test" element={<MockTest />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/rank-predictor" element={<RankPredictor />} />
        <Route path="/results" element={<Results />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-started" element={<Login initialMode="signup" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-cancellation" element={<RefundCancellation />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
      {!isDashboard && <ChatbotWidget />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
