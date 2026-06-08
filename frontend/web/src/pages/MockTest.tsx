import FooterPolicyLinks from "../components/FooterPolicyLinks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const mockTests = [
  {
    tag: "Mains",
    title: "JEE Mains Full Syllabus",
    detail: "40+ papers",
    startPractice: false,
  },
  {
    tag: "Advanced",
    title: "JEE Advanced Full Syllabus",
    detail: "25+ papers",
    startPractice: false,
  },
  {
    tag: "Mains",
    title: "Chapter-wise Mains Tests",
    detail: "120+ papers",
    startPractice: false,
  },
  {
    tag: "Advanced",
    title: "All-India Test Series",
    detail: "Weekly",
    startPractice: false,
  },
  {
    tag: "Live Ranked",
    title: "AI Adaptive Tests",
    detail: "Unlimited",
    startPractice: true,
  },
  {
    tag: "Personalized",
    title: "JEE Mains Previous Year",
    detail: "2005 – 2025",
    startPractice: false,
  },
];

const programLinks = [
  "Two-Year Integrated",
  "Sprint to JEE",
  "Advanced Booster",
  "Foundation (Class 9–10)",
];

const questions = [
  {
    question: "If f(x) = x^2 + 3x, find f(2).",
    options: ["8", "10", "12", "14"],
    answer: "10",
  },
  {
    question: "Which subject studies force, motion, and energy?",
    options: ["Physics", "Chemistry", "Mathematics", "Biology"],
    answer: "Physics",
  },
  {
    question: "What is the derivative of x^2?",
    options: ["x", "2x", "x^3", "2"],
    answer: "2x",
  },
];

function MockTest() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!showQuiz || timeLeft === 0 || showResult) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft, showResult, showQuiz]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const score = questions.filter((question, index) => {
    return selectedAnswers[index] === question.answer;
  }).length;

  function chooseAnswer(questionIndex: number, option: string) {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = option;
    setSelectedAnswers(newAnswers);
  }

  function restartTest() {
    setSelectedAnswers([]);
    setShowResult(false);
    setTimeLeft(120);
  }

  function startPractice() {
    restartTest();
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToCatalog() {
    setShowQuiz(false);
    restartTest();
  }

  if (showQuiz) {
    return (
      <main className="mock-tests-page">
        <section className="mock-quiz-section">
          <div className="mock-quiz-inner">
            <button type="button" className="mock-back-btn" onClick={backToCatalog}>
              ← Back to Mock Tests
            </button>

            <section className="quiz-panel">
              <div className="quiz-top-row">
                <div>
                  <p className="dashboard-label">Quiz Timer</p>
                  <h2>
                    {minutes}:{seconds}
                  </h2>
                </div>
                <button type="button" className="secondary-btn" onClick={restartTest}>
                  Restart Test
                </button>
              </div>

              <div className="question-list">
                {questions.map((question, questionIndex) => (
                  <article className="question-card" key={question.question}>
                    <p className="question-number">Question {questionIndex + 1}</p>
                    <h3>{question.question}</h3>

                    <div className="answer-grid">
                      {question.options.map((option) => (
                        <button
                          type="button"
                          className={
                            selectedAnswers[questionIndex] === option
                              ? "answer-option selected-answer"
                              : "answer-option"
                          }
                          onClick={() => chooseAnswer(questionIndex, option)}
                          key={option}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="quiz-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowResult(true)}
                >
                  Submit Test
                </button>

                {showResult && (
                  <div className="score-result">
                    Score: {score} / {questions.length}
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mock-tests-page">
      <section className="courses-hero">
        <p className="section-kicker gold-kicker">Mock Tests</p>
        <h1>Train under real exam pressure</h1>
        <p>
          Ranked, timed, and analyzed by AI — every test surfaces the exact
          concepts you need to revisit.
        </p>
      </section>

      <section className="mock-tests-body">
        <div className="mock-tests-inner">
          <div className="mock-cards-grid">
            {mockTests.map((test) => (
              <article className="mock-test-card" key={test.title}>
                <p className="mock-test-tag">{test.tag}</p>
                <h3>{test.title}</h3>
                <p className="mock-test-detail">{test.detail}</p>
                {test.startPractice ? (
                  <button
                    type="button"
                    className="mock-test-link"
                    onClick={startPractice}
                  >
                    Start Practice →
                  </button>
                ) : (
                  <span className="mock-test-link muted">Coming soon</span>
                )}
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

export default MockTest;
