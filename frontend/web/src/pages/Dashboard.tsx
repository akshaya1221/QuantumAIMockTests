import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Clock3,
  FileText,
  GraduationCap,
  Medal,
  MessageCircleQuestion,
  PlayCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import FooterPolicyLinks from "../components/FooterPolicyLinks";

const courses = [
  {
    name: "Two-Year Integrated",
    progress: 62,
    tags: ["Physics", "Chemistry", "Mathematics"],
  },
  {
    name: "Sprint to JEE",
    progress: 48,
    tags: ["Physics", "Chemistry", "Mathematics"],
  },
  {
    name: "Advanced Booster",
    progress: 36,
    tags: ["Advanced", "Mocks", "Revision"],
  },
  {
    name: "Foundation Class 9-10",
    progress: 72,
    tags: ["Concepts", "Olympiad", "Basics"],
  },
];

const stats = [
  { label: "Mock Tests Attempted", value: "18", icon: FileText },
  { label: "Average Score", value: "74%", icon: BarChart3 },
  { label: "Study Hours", value: "126h", icon: Clock3 },
  { label: "Predicted Rank", value: "8.4k", icon: Medal },
];

const materials = [
  { subject: "Physics", text: "Formula sheets, concepts, PYQs and revision notes." },
  { subject: "Chemistry", text: "Physical, organic and inorganic study packs." },
  { subject: "Mathematics", text: "Problem sets for algebra, calculus and geometry." },
];

const mockTests = [
  { name: "JEE Main Full Test", detail: "Full syllabus timed mock" },
  { name: "JEE Advanced Practice Test", detail: "Paper 1 + Paper 2 pattern" },
  { name: "Chapter-wise Test", detail: "Targeted practice for weak chapters" },
];

function Dashboard() {
  return (
    <main className="student-dashboard">
      <DashboardNavbar />

      <div className="student-dashboard-inner">
        <section className="student-hero">
          <div>
            <p className="eyebrow">Student Dashboard</p>
            <h1>Welcome back, Student</h1>
            <p>
              Continue your JEE preparation journey with Valluri. Stay balanced
              across Physics, Chemistry and Mathematics with guided practice,
              mocks, AI support and revision.
            </p>

            <div className="student-hero-actions">
              <Link to="/courses" className="btn btn-primary">
                <PlayCircle size={18} /> Continue Learning
              </Link>
              <Link to="/mock-test" className="btn btn-outline">
                Take Mock Test
              </Link>
              <Link to="/ai-tutor" className="btn btn-outline">
                Ask AI Tutor
              </Link>
            </div>
          </div>

          <aside className="student-focus-card">
            <GraduationCap size={34} />
            <span>Today&apos;s Focus</span>
            <strong>PCM Balanced Practice</strong>
            <p>One physics concept, one chemistry drill and one maths problem set.</p>
          </aside>
        </section>

        <section className="dashboard-section" aria-labelledby="courses-heading">
          <div className="dashboard-section-heading">
            <div>
              <p className="dashboard-label">My Courses</p>
              <h2 id="courses-heading">Course progress</h2>
            </div>
            <Link to="/courses">View all courses</Link>
          </div>

          <div className="course-progress-grid">
            {courses.map((course) => (
              <article className="course-progress-card" key={course.name}>
                <h3>{course.name}</h3>
                <div className="course-progress-topline">
                  <span>{course.progress}% complete</span>
                  <Link to="/courses">Continue</Link>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="subject-tags">
                  {course.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="quick-stats-grid" aria-label="Quick stats">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article className="quick-stat-card" key={stat.label}>
                <Icon size={22} />
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            );
          })}
        </section>

        <section className="dashboard-split">
          <article className="ai-tutor-highlight">
            <div>
              <p className="dashboard-label">AI Tutor</p>
              <h2>Ask doubts instantly</h2>
              <p>
                Get step-by-step explanations for Physics, Chemistry and
                Mathematics in a JEE-focused teaching style.
              </p>
            </div>
            <Brain size={48} />
            <Link to="/ai-tutor" className="btn btn-primary">
              Open AI Tutor <ArrowRight size={18} />
            </Link>
          </article>

          <article className="rank-mini-card">
            <p className="dashboard-label">Results & Rank</p>
            <h2>Check your predicted rank</h2>
            <p>Use mock performance trends to estimate your current AIR band.</p>
            <div className="rank-mini-actions">
              <Link to="/results">View Results</Link>
              <Link to="/rank-predictor">Predict Rank</Link>
            </div>
          </article>
        </section>

        <section className="dashboard-section" aria-labelledby="materials-heading">
          <div className="dashboard-section-heading">
            <div>
              <p className="dashboard-label">Study Materials</p>
              <h2 id="materials-heading">Subject-wise library</h2>
            </div>
          </div>

          <div className="materials-dashboard-grid">
            {materials.map((material) => (
              <article className="material-dashboard-card" key={material.subject}>
                <BookOpen size={24} />
                <h3>{material.subject}</h3>
                <p>{material.text}</p>
                <Link to="/study-materials">View Materials</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section" aria-labelledby="mock-heading">
          <div className="dashboard-section-heading">
            <div>
              <p className="dashboard-label">Mock Tests</p>
              <h2 id="mock-heading">Recommended tests</h2>
            </div>
            <Link to="/mock-test">Open test center</Link>
          </div>

          <div className="mock-dashboard-list">
            {mockTests.map((test) => (
              <article className="mock-dashboard-row" key={test.name}>
                <Target size={22} />
                <div>
                  <h3>{test.name}</h3>
                  <p>{test.detail}</p>
                </div>
                <Link to="/mock-test">Start</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section profile-strip" id="profile">
          <div>
            <p className="dashboard-label">Profile</p>
            <h2>Your Valluri learning path is active</h2>
            <p>
              Keep practising daily, take weekly mocks and use the AI tutor for
              every doubt before it becomes a weak topic.
            </p>
          </div>
          <div className="profile-strip-actions">
            <span>
              <TrendingUp size={18} /> Weekly streak: 5 days
            </span>
            <span>
              <MessageCircleQuestion size={18} /> Doubts solved: 42
            </span>
          </div>
        </section>

        <div className="page-policy-footer">
          <FooterPolicyLinks />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
