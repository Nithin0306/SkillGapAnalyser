import Navbar from "../components/navbar";
import "../App.css";

const Features = () => {
  return (
    <div>
      <Navbar />
      <div className="feat-container">
        <h1>Features</h1>
        <h2>How It Works</h2>
        <ul>
          <li>Users upload their resume and enter a target job role.</li>
          <li>AI extracts skills and compares them with job requirements.</li>
          <li>Fetches course recommendations from Coursera & Udemy.</li>
          <li>YouTube API recommends video tutorials for missing skills.</li>
          <li>Suggests a personalized learning path.</li>
          <li>
            ✅ Hybrid Learning Paths – Blends courses + video tutorials +
            projects
          </li>
          <li> ✅ Recommends top courses from Coursera, Udemy, YouTube.</li>
          <li>
            ✅ Job Matching Engine – Suggests roles tailored to newly acquired
            skills.
          </li>
          <li>
            {" "}
            ✅ Project Generator – Real-world projects to build portfolios fast.
          </li>
          <li>
            ✅Resume-to-Role Match – AI extracts skills from resumes & compares
            them to job requirements.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
