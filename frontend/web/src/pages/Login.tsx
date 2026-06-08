import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterPolicyLinks from "../components/FooterPolicyLinks";

const API_BASE_URL = "http://127.0.0.1:8000";

type LoginProps = {
  initialMode?: "login" | "signup";
};

function Login({ initialMode = "login" }: LoginProps) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(initialMode === "signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [targetExam, setTargetExam] = useState("JEE Advanced");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loginStudent(loginEmail: string, loginPassword: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Login failed. Please try again.");
    }

    localStorage.setItem("access_token", data.access_token);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isSignup) {
        const signupResponse = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            class_level: classLevel,
            target_exam: targetExam,
          }),
        });

        const signupData = await signupResponse.json();

        if (!signupResponse.ok) {
          throw new Error(signupData.detail || "Signup failed. Please try again.");
        }
      }

      await loginStudent(email, password);
      window.dispatchEvent(new Event("auth-change"));
      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Request failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-copy">
          <p className="eyebrow">{isSignup ? "Signup" : "Login"}</p>
          <h1 id="auth-title">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p>
            {isSignup
              ? "Start your JEE practice with a student account."
              : "Sign in to continue your JEE practice."}
          </p>

          <div className="auth-mini-stats" aria-hidden="true">
            <span>AI Tutor</span>
            <span>Mock Tests</span>
            <span>Rank Tools</span>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <label>
                Name
                <input
                  type="text"
                  placeholder="Student name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>

              <div className="auth-form-grid">
                <label>
                  Class Level
                  <input
                    type="text"
                    placeholder="11, 12, or Dropper"
                    value={classLevel}
                    onChange={(event) => setClassLevel(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Target Exam
                  <input
                    type="text"
                    placeholder="JEE Mains / JEE Advanced"
                    value={targetExam}
                    onChange={(event) => setTargetExam(event.target.value)}
                    required
                  />
                </label>
              </div>
            </>
          )}

          <label>
            Email
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : isSignup ? "Create Account" : "Login"}
          </button>

          <button
            type="button"
            className="auth-switch-btn"
            onClick={() => {
              setIsSignup((currentValue) => !currentValue);
              setError("");
            }}
          >
            {isSignup
              ? "Already have an account? Login"
              : "New student? Create an account"}
          </button>

          {!isSignup && (
            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot password?
            </Link>
          )}
        </form>
      </section>

      <div className="auth-policy-footer">
        <FooterPolicyLinks />
      </div>
    </main>
  );
}

export default Login;
