import FooterPolicyLinks from "../components/FooterPolicyLinks";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Send, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

type Message = {
  sender: "AI Tutor" | "Student";
  text: string;
};

const samplePrompts = [
  "Derive the formula for the Bohr radius.",
  "Solve: ∫ x·e^(x²) dx",
  "Explain rolling motion of a solid sphere on an incline.",
  "Give me a 7-day revision plan for Electrochemistry.",
];

const programLinks = [
  "Two-Year Integrated",
  "Sprint to JEE",
  "Advanced Booster",
  "Foundation (Class 9–10)",
];

function AITutor() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage(text?: string) {
    const question = (text ?? inputText).trim();
    if (question === "") {
      return;
    }

    const studentMessage: Message = {
      sender: "Student",
      text: question,
    };

    const tutorMessage: Message = {
      sender: "AI Tutor",
      text: "Fake AI response: First identify the formula, write the known values, substitute carefully, and then check units.",
    };

    setMessages((prev) => [...prev, studentMessage, tutorMessage]);
    setInputText("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="ai-tutor-page">
      <section className="courses-hero">
        <p className="section-kicker gold-kicker">AI Tutor</p>
        <h1>Ask anything. Anytime.</h1>
        <p>
          A multi-agent tutor trained on JEE Mains &amp; Advanced — derivations,
          hints, and step-by-step solutions on demand.
        </p>
      </section>

      <section className="page-body ai-tutor-body">
        <div className="page-inner">
          <p className="pill demo-badge page-badge">
            <Sparkles size={14} /> Live Demo
          </p>
          <p className="page-body-lead">
            Physics, Chemistry, or Maths — Mains or Advanced. Get a step-by-step
            answer instantly.
          </p>

          <div className="tutor-demo-panel">
            <div className="tutor-demo-screen">
              {messages.length === 0 ? (
                <>
                  <span className="tutor-demo-logo">
                    <Sparkles size={30} />
                  </span>
                  <p>Try a sample question, or type your own JEE doubt below.</p>
                  <div className="prompt-chips tutor-prompt-chips">
                    {samplePrompts.map((prompt) => (
                      <button
                        type="button"
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="tutor-messages">
                  {messages.map((message, index) => (
                    <div
                      className={
                        message.sender === "AI Tutor"
                          ? "tutor-message tutor-message-ai"
                          : "tutor-message tutor-message-student"
                      }
                      key={`${message.sender}-${index}`}
                    >
                      <strong>{message.sender}</strong>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form className="tutor-demo-input" onSubmit={handleSubmit}>
              <input
                aria-label="Ask a Physics, Chemistry or Maths question"
                placeholder="Ask a Physics, Chemistry or Maths question..."
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
              />
              <button type="submit" aria-label="Send question">
                <Send size={22} />
              </button>
            </form>
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

export default AITutor;
