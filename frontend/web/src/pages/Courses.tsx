import FooterPolicyLinks from "../components/FooterPolicyLinks";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import logo from "../assets/logo.png";

const courses = [
  {
    label: "Class 11 + 12",
    title: "Two-Year Integrated",
    text: "The complete agentic journey from foundations to JEE Advanced mastery.",
    price: "₹1,80,000",
    period: "program",
    featured: true,
    badge: "Most Chosen",
    features: [
      "540+ live classes",
      "AI study planner",
      "Weekly Advanced mocks",
      "1:1 faculty mentor",
      "Parent dashboard",
    ],
  },
  {
    label: "Class 12 / Droppers",
    title: "Sprint to JEE",
    text: "Intensive 11-month track engineered to maximize rank in a single attempt.",
    price: "₹95,000",
    period: "program",
    features: [
      "320+ live classes",
      "Daily DPPs auto-graded",
      "All-India test series",
      "Rank predictor access",
    ],
  },
  {
    label: "Crash + Revision",
    title: "Advanced Booster",
    text: "90-day high-intensity revision with AI-curated weak-topic drilling.",
    price: "₹35,000",
    period: "program",
    features: [
      "Topic-wise diagnostics",
      "Unlimited AI doubt-solving",
      "12 full-syllabus mocks",
      "Last-mile strategy",
    ],
  },
];

const programLinks = [
  "Two-Year Integrated",
  "Sprint to JEE",
  "Advanced Booster",
  "Foundation (Class 9–10)",
];

function Courses() {
  return (
    <main className="courses-page">
      <section className="courses-hero">
        <p className="section-kicker gold-kicker">Programs</p>
        <h1>Courses for every aspirant.</h1>
        <p>
          From Class 11 foundations to last-mile Advanced sprints — pick a track
          and let our agents adapt the curriculum to you.
        </p>
      </section>

      <section className="courses-body">
        <div className="courses-inner">
          <div className="courses-split-heading">
            <div>
              <p className="section-kicker">Programs</p>
              <h2 className="display-heading">
                Built for <em>every</em> aspirant.
              </h2>
            </div>
            <p>
              Choose a track. Our agents will adapt the curriculum, pace, and
              pedagogy to your goal.
            </p>
          </div>

          <div className="course-cards-grid">
            {courses.map((course) => (
              <article
                className={`course-card${course.featured ? " featured" : ""}`}
                key={course.title}
              >
                {course.badge && (
                  <span className="course-card-badge">{course.badge}</span>
                )}
                <p className="course-card-label">{course.label}</p>
                <h3>{course.title}</h3>
                <p className="course-card-text">{course.text}</p>
                <p className="course-card-price">
                  {course.price}
                  <span>/ {course.period}</span>
                </p>
                <ul>
                  {course.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} strokeWidth={2.5} /> {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/mock-test"
                  className={
                    course.featured ? "course-enroll-btn" : "course-enroll-btn-dark"
                  }
                >
                  Enroll Now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        <div className="contact-footer-inner">
          <div className="contact-footer-brand">
            <Link to="/" className="footer-brand">
              <img src={logo} alt="VALLURI logo" className="brand-logo-img" />
              <span className="brand-text">
                <span className="footer-brand-name">
                  VALLURI<sup>TM</sup>
                </span>
                <span className="brand-subtitle">IIT-JEE</span>
              </span>
            </Link>
            <p>
              India&apos;s first agentic AI coaching system for IIT JEE Mains
              &amp; Advanced aspirants.
            </p>
          </div>

          <div className="contact-footer-col">
            <h3>Programs</h3>
            <ul>
              {programLinks.map((program) => (
                <li key={program}>
                  <Link to="/courses">{program}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-footer-col">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:hello@valluri.ai">hello@valluri.ai</a>
              </li>
              <li>
                <a href="tel:+918040000000">+91 80 4000 0000</a>
              </li>
              <li>Bengaluru · Hyderabad · Online</li>
            </ul>
          </div>
        </div>

        <div className="contact-footer-bar">
          <p>© 2026 VALLURI™ Learning Systems. All rights reserved.</p>
          <FooterPolicyLinks />
        </div>
      </footer>
    </main>
  );
}

export default Courses;
