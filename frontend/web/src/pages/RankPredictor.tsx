import FooterPolicyLinks from "../components/FooterPolicyLinks";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";
import logo from "../assets/logo.png";

function getRankPrediction(score: number) {
  if (score >= 260) {
    return "Estimated AIR 1 - 500";
  }

  if (score >= 230) {
    return "Estimated AIR 500 - 2,000";
  }

  if (score >= 200) {
    return "Estimated AIR 2,000 - 8,000";
  }

  if (score >= 170) {
    return "Estimated AIR 8,000 - 20,000";
  }

  if (score >= 140) {
    return "Estimated AIR 20,000 - 50,000";
  }

  return "Needs more practice, focus on weak topics";
}

const programLinks = [
  "Two-Year Integrated",
  "Sprint to JEE",
  "Advanced Booster",
  "Foundation (Class 9–10)",
];

function RankPredictor() {
  const [score, setScore] = useState("");
  const [prediction, setPrediction] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericScore = Number(score);

    if (!score || Number.isNaN(numericScore)) {
      setPrediction("Enter a valid score out of 300");
      return;
    }

    const clampedScore = Math.max(0, Math.min(300, numericScore));
    setPrediction(getRankPrediction(clampedScore));
  }

  return (
    <main className="rank-predictor-page">
      <section className="courses-hero">
        <p className="section-kicker gold-kicker">Rank Predictor</p>
        <h1>Where do you stand today?</h1>
        <p>
          Enter your expected JEE Mains score and our model will estimate your
          All-India Rank band.
        </p>
      </section>

      <section className="page-body">
        <div className="page-inner page-inner-narrow">
          <form className="predictor-form-card" onSubmit={handleSubmit}>
            <label htmlFor="jee-score">Expected JEE Mains score (out of 300)</label>
            <input
              id="jee-score"
              inputMode="numeric"
              max="300"
              min="0"
              onChange={(event) => setScore(event.target.value)}
              placeholder="e.g. 220"
              type="number"
              value={score}
            />
            <button type="submit" className="contact-submit-btn">
              Predict My Rank
            </button>

            {prediction && (
              <div className="predictor-result" role="status">
                <Target size={24} />
                <div>
                  <span>Your rank band</span>
                  <strong>{prediction}</strong>
                </div>
              </div>
            )}
          </form>
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

export default RankPredictor;
