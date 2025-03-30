import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./navbar";
import "../App.css";
import myGif from "../assets/analize.gif";

const Home = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState("");
  const [projectIdeas, setProjectIdeas] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobTitle) {
      alert("Please upload a resume and enter a job title");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", jobTitle);

    try {
      // Resume Analysis
      const resAnalysis = await fetch("http://localhost:8000/analyze_resume/", {
        method: "POST",
        body: formData,
      });

      if (!resAnalysis.ok) throw new Error("Resume analysis failed");
      const analysisData = await resAnalysis.json();
      const skillsList = analysisData.missing_skills
        .split("\n")
        .filter((skill) => skill.trim() !== "")
        .map((skill) => skill.replace(/^-\s*/, "").trim());

      setMissingSkills(skillsList);

      // Course Recommendations
      const encodedJobTitle = encodeURIComponent(jobTitle);
      const resCourses = await fetch(
        `http://localhost:8000/fetch_courses/${encodedJobTitle}`
      );
      if (!resCourses.ok) throw new Error("Fetching courses failed");
      const courseData = await resCourses.json();
      setCourses(courseData.courses || []);

      // YouTube Videos
      const resVideos = await fetch(
        `http://localhost:8000/youtube-courses/${encodedJobTitle}`
      );
      if (!resVideos.ok) throw new Error("Fetching YouTube videos failed");
      const videoData = await resVideos.json();
      setVideos(videoData.videos || []);

      // Job Matching
      const resJobMatching = await fetch(
        "http://localhost:8000/job_matching/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skills: skillsList }),
        }
      );
      if (!resJobMatching.ok) throw new Error("Job matching failed");
      const jobMatchData = await resJobMatching.json();
      setJobRecommendations(jobMatchData.job_recommendations);

      // Project Generator
      const resProjects = await fetch(
        "http://localhost:8000/project_generator/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skills: skillsList }),
        }
      );
      if (!resProjects.ok) throw new Error("Project generation failed");
      const projectData = await resProjects.json();
      setProjectIdeas(projectData.project_ideas);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>AI-Based Skill Gap Analyzer</h1>
        <h3>
          Upload your resume and enter your desired job to receive personalized
          course recommendations.
        </h3>

        <form onSubmit={handleSubmit}>
          <label className="file-label" htmlFor="resumeUpload">
            Upload Resume (PDF/DOCX)
          </label>
          <input
            type="file"
            id="resumeUpload"
            className="hidden-file-input"
            onChange={handleFileChange}
          />
          <input
            className="textbox"
            type="text"
            placeholder="Enter your desired job title"
            required
            value={jobTitle}
            onChange={handleJobTitleChange}
          />
          <br /> <br />
          <img src={myGif} alt="Processing..."></img> <br />
          <button type="submit">Analyze</button>
        </form>

        {missingSkills.length > 0 && (
          <div className="results-section">
            <h2>Missing Skills:</h2>
            <ul className="miss">
              {missingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {courses.length > 0 && (
          <div className="results-section">
            <h2>Recommended Courses:</h2>
            <ul>
              {courses.map((course, index) => (
                <li key={index}>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {course.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {videos.length > 0 && (
          <div className="results-section">
            <h2>YouTube Courses:</h2>
            <ul className="videos">
              {videos.map((video, index) => (
                <li key={index}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video.title}
                    </a>
                    <p>{video.channel}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {jobRecommendations && (
          <div className="results-section">
            <h2>Job Recommendations:</h2>
            <pre>{jobRecommendations}</pre>
          </div>
        )}

        {projectIdeas && (
          <div className="results-section">
            <h2>Project Ideas:</h2>
            <pre>{projectIdeas}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
