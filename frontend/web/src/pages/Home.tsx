import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FooterPolicyLinks from "../components/FooterPolicyLinks";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  Map,
  Repeat2,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

const agents = [
  {
    icon: HelpCircle,
    title: "Doubt Solver",
    text: "Snap any PCM problem and get step-by-step solutions with concept callouts in seconds.",
  },
  {
    icon: CalendarDays,
    title: "Adaptive Planner",
    text: "An autonomous agent builds your daily study schedule around syllabus, mocks, and energy.",
  },
  {
    icon: FileCheck2,
    title: "Mock Test Engine",
    text: "JEE-pattern tests auto-generated, auto-graded, with topic-wise weakness diagnostics.",
  },
  {
    icon: Map,
    title: "Concept Mapper",
    text: "Connects chapters, formulas, and mistakes so every revision session has a purpose.",
  },
  {
    icon: Target,
    title: "Rank Predictor",
    text: "Forecasts your AIR band from score, accuracy, consistency, and current test trends.",
  },
  {
    icon: Repeat2,
    title: "Revision Coach",
    text: "Daily summaries, weak-topic drills, and parent reports that keep momentum visible.",
  },
];

const programs = [
  {
    label: "Class 11 + 12",
    title: "Two-Year Integrated",
    text: "The complete agentic journey from foundations to JEE Advanced mastery.",
    features: ["540+ live classes", "AI study planner", "Weekly Advanced mocks"],
  },
  {
    label: "Class 12 / Droppers",
    title: "Sprint to JEE",
    text: "An intensive 11-month track engineered to maximize rank in a single attempt.",
    features: ["320+ live classes", "Daily DPPs auto-graded", "All-India test series"],
  },
  {
    label: "Crash + Revision",
    title: "Advanced Booster",
    text: "High-intensity revision with AI-curated weak-topic drilling and strategy.",
    features: ["Topic diagnostics", "Unlimited AI doubts", "12 full-syllabus mocks"],
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹0",
    period: "forever",
    features: ["AI Tutor limited", "5 Mock Tests", "Basic Study Materials"],
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "month",
    featured: true,
    features: [
      "Unlimited AI Coaching",
      "All Mock Tests + Analytics",
      "Full Study Library",
      "Rank Predictor",
    ],
  },
  {
    name: "Elite",
    price: "₹2,999",
    period: "month",
    features: [
      "Everything in Pro",
      "1:1 IIT Mentor Sessions",
      "Personalized Strategy",
      "Priority Doubt Support",
    ],
  },
];

const results = [
  {
    rank: "AIR 12",
    year: "JEE Adv 2025",
    quote:
      "The AI planner caught my weak topics 3 months before mocks did. Game changer.",
    name: "Aarav Mehta",
  },
  {
    rank: "AIR 47",
    year: "JEE Adv 2025",
    quote:
      "I asked it to derive Bohr's model at 2 AM. It taught me better than my notes.",
    name: "Ishita Reddy",
  },
  {
    rank: "AIR 138",
    year: "JEE Adv 2024",
    quote:
      "Daily DPPs from the agent felt personal. Mains 99.91 percentile, Advanced under 200.",
    name: "Karthik V.",
  },
];

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    document
      .querySelector(location.hash)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <main className="site-shell">
      <section className="hero-section">
        <div className="hero-art" aria-hidden="true">
          <span className="atom atom-one">⚛</span>
          <span className="atom atom-two">∑</span>
          <span className="atom atom-three">H₂O</span>
        </div>

        <div className="hero-content">
          <p className="pill hero-badge">
            <Sparkles size={14} /> Agentic AI for JEE
          </p>
          <h1 className="hero-title">
            The intelligent
            <br />
            path to <span>IIT.</span>
          </h1>
          <p className="hero-subtitle">
            VALLURI™ pairs world-class faculty pedagogy with an autonomous AI
            tutor that plans, teaches, drills, and adapts — every single day —
            until you crack JEE Mains &amp; Advanced.
          </p>
          <div className="hero-actions">
            <Link to="/ai-tutor" className="btn btn-primary">
              Try the AI Tutor <ArrowRight size={18} />
            </Link>
            <a href="#programs" className="btn btn-outline">
              Explore Programs
            </a>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>12,400+</dt>
              <dd>Aspirants Mentored</dd>
            </div>
            <div>
              <dt>387</dt>
              <dd>IIT Selections</dd>
            </div>
            <div>
              <dt>AIR 12</dt>
              <dd>Best Rank, 2025</dd>
            </div>
            <div>
              <dt>24/7</dt>
              <dd>AI Doubt Support</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="light-section agents-section" id="agents">
        <div className="section-inner">
          <p className="section-kicker">The Agent</p>
          <h2 className="display-heading">
            Six autonomous agents.
            <br />
            <em>One unfair advantage.</em>
          </h2>
          <p className="section-copy">
            VALLURI™ is not a chatbot. It is a system of specialized AI agents
            that collaborate to teach, test, and mentor you — the way a top Kota
            faculty would, around the clock.
          </p>

          <div className="agent-grid">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <article className="agent-card" key={agent.title}>
                  <span className="agent-icon">
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <h3>{agent.title}</h3>
                  <p>{agent.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="light-section programs-section" id="programs">
        <div className="section-inner">
          <div className="split-heading">
            <div>
              <p className="section-kicker">Programs</p>
              <h2 className="display-heading">
                Built for <em>every aspirant.</em>
              </h2>
            </div>
            <p>
              Choose a track. Our agents will adapt the curriculum, pace, and
              pedagogy to your goal.
            </p>
          </div>

          <div className="program-grid">
            {programs.map((program) => (
              <article className="program-card" key={program.title}>
                <p className="program-label">{program.label}</p>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <ul>
                  {program.features.map((feature) => (
                    <li key={feature}>
                      <Check size={18} /> {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section pricing-section" id="pricing">
        <div className="section-inner">
          <div className="section-heading-centered">
            <p className="section-kicker gold-kicker">Pricing</p>
            <h2 className="display-heading dark-heading">
              Pricing that <span>scales with you.</span>
            </h2>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                className={`pricing-card${plan.featured ? " featured" : ""}`}
                key={plan.name}
              >
                {plan.featured && <span className="plan-badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <p className="plan-price">
                  {plan.price}
                  <span>/ {plan.period}</span>
                </p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={18} /> {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/get-started" className="program-button">
                  Get Started
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="light-section results-section" id="results">
        <div className="section-inner">
          <p className="section-kicker">Results</p>
          <h2 className="display-heading">
            Ranks that <em>speak</em>
            <br />
            <em>for themselves.</em>
          </h2>

          <div className="result-grid">
            {results.map((result) => (
              <figure className="result-card" key={result.rank}>
                <strong>{result.rank}</strong>
                <span>{result.year}</span>
                <blockquote>"{result.quote}"</blockquote>
                <figcaption>— {result.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="tutor-demo-section" id="ai-tutor-demo">
        <div className="section-inner demo-inner">
          <p className="pill demo-badge">
            <Sparkles size={14} /> Live Demo
          </p>
          <h2 className="display-heading dark-heading">
            Ask the AI tutor <span>anything.</span>
          </h2>
          <p className="demo-copy">
            Physics, Chemistry, or Maths — Mains or Advanced. Get a
            step-by-step answer instantly.
          </p>

          <div className="demo-panel">
            <div className="demo-screen">
              <span className="demo-logo">
                <Sparkles size={30} />
              </span>
              <p>Try a sample question, or type your own JEE doubt below.</p>
              <div className="prompt-chips">
                <button type="button">Derive the formula for the Bohr radius.</button>
                <button type="button">Solve: ∫ x·e^(x²) dx</button>
                <button type="button">
                  Explain rolling motion of a solid sphere on an incline.
                </button>
                <button type="button">
                  Give me a 7-day revision plan for Electrochemistry.
                </button>
              </div>
            </div>
            <form className="demo-input">
              <input
                aria-label="Ask a Physics, Chemistry or Maths question"
                placeholder="Ask a Physics, Chemistry or Maths question..."
              />
              <button type="submit" aria-label="Send question">
                <Send size={22} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <GraduationCap className="cta-icon" size={44} />
        <h2>
          Your IIT journey starts <span>today.</span>
        </h2>
        <p>
          Start with the AI tutor, take a diagnostic mock, and let VALLURI build
          the next week of work around your actual gaps.
        </p>
        <div className="hero-actions">
            <Link to="/get-started" className="btn btn-primary">
              Get Started Free
            </Link>
          <Link to="/login" className="btn btn-outline">
            Talk to an Advisor
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <p>© 2026 Valluri IIT-JEE All rights reserved.</p>
        <FooterPolicyLinks />
      </footer>
    </main>
  );
}

export default Home;
