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
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
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

  // Function to format job recommendations - Improved to better handle the formatting
  const formatJobRecommendations = (text) => {
    if (!text) return null;

    // Split the text into sections (one job per section)
    const jobSections = text.split(/\d+\.\s+/);

    // Filter out empty sections and process each job
    return jobSections
      .filter((section) => section.trim().length > 0)
      .map((section) => {
        // Extract job title - everything up to the first "* **"
        const titleMatch = section.match(/^([^*]+)/);
        const title = titleMatch ? titleMatch[1].trim() : "Job Title";

        // Extract description
        const descMatch = section.match(
          /\*\s+\*\*Description:\*\*\s+(.*?)(?=\*\s+\*\*|$)/s
        );
        const description = descMatch ? descMatch[1].trim() : "";

        // Extract skills
        const skillsMatch = section.match(
          /\*\s+\*\*Key Required Skills:\*\*\s+(.*?)(?=\*\s+\*\*|$)/s
        );
        const skills = skillsMatch ? skillsMatch[1].trim() : "";

        // Extract career path
        const pathMatch = section.match(
          /\*\s+\*\*Potential Career Path:\*\*\s+(.*?)(?=\*\s+\*\*|$)/s
        );
        const careerPath = pathMatch ? pathMatch[1].trim() : "";

        return {
          title,
          description,
          skills,
          careerPath,
        };
      });
  };

  // Function to format project ideas - Improved to remove stars and markdown formatting
  const formatProjectIdeas = (text) => {
    if (!text) return null;

    const projects = text.split(/\d+\.\s+Project Title:/g);

    return projects
      .filter((project) => project.trim().length > 0)
      .map((project) => {
        // Clean up the text by removing markdown symbols and extra spaces
        return project.replace(/\*\*/g, "").replace(/##/g, "").trim();
      });
  };

  const formattedJobs = jobRecommendations
    ? formatJobRecommendations(jobRecommendations)
    : [];
  const formattedProjects = projectIdeas
    ? formatProjectIdeas(projectIdeas)
    : [];

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
          <div className="file-upload-container">
            <label className="file-label" htmlFor="resumeUpload">
              Upload Resume (PDF/DOCX)
            </label>
            <input
              type="file"
              id="resumeUpload"
              className="hidden-file-input"
              onChange={handleFileChange}
              accept=".pdf,.docx"
            />
            <div className="file-name">{fileName}</div>
          </div>

          <input
            className="textbox"
            type="text"
            placeholder="Enter your desired job title"
            required
            value={jobTitle}
            onChange={handleJobTitleChange}
          />

          <img src={myGif} alt="Processing..." />

          <button type="submit">
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>

        {loading && <div className="loading">Analyzing your resume...</div>}

        {missingSkills.length > 0 && (
          <div className="results-section skills-section">
            <h2>Missing Skills</h2>
            <div className="skills-container">
              {missingSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-bullet">•</span> {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {formattedJobs && formattedJobs.length > 0 && (
          <div className="results-section jobs-section">
            <h2>Job Recommendations</h2>
            {formattedJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3 className="job-title">{job.title.replace(/\*\*/g, "")}</h3>
                <div className="job-details">
                  <div className="job-detail">
                    <strong>Description</strong> {job.description}
                  </div>
                  <div className="job-detail">
                    <strong>Key Required Skills</strong> {job.skills}
                  </div>
                  <div className="job-detail">
                    <strong>Potential Career Path</strong> {job.careerPath}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {formattedProjects && formattedProjects.length > 0 && (
          <div className="results-section">
            <h2>Project Ideas</h2>
            <div className="projects-grid">
              {formattedProjects.map((projectText, index) => {
                // Parse project details from each individual project text
                const getField = (regex) => {
                  const match = projectText.match(regex);
                  return match ? match[1].trim() : "";
                };

                // Extract all fields for each separate project
                const titleMatch = projectText.match(
                  /Project Title:\s*(.*?)(?=\s*Description:|$)/s
                );
                const title = titleMatch ? titleMatch[1].trim() : "Project";

                const descriptionMatch = projectText.match(
                  /Description:\s*(.*?)(?=\s*Key Skills Demonstrated:|$)/s
                );
                const description = descriptionMatch
                  ? descriptionMatch[1].trim()
                  : "";

                const skillsMatch = projectText.match(
                  /Key Skills Demonstrated:\s*(.*?)(?=\s*Potential Real-World Impact:|$)/s
                );
                const skills = skillsMatch ? skillsMatch[1].trim() : "";

                const impactMatch = projectText.match(
                  /Potential Real-World Impact:\s*(.*?)(?=\s*Difficulty Level:|$)/s
                );
                const impact = impactMatch ? impactMatch[1].trim() : "";

                const difficultyMatch = projectText.match(
                  /Difficulty Level:\s*(.*?)$/s
                );
                const difficulty = difficultyMatch
                  ? difficultyMatch[1].trim()
                  : "Intermediate";

                return (
                  <div key={index} className="project-card">
                    <div className="project-title">{title}</div>

                    <div className="project-section">
                      <div className="section-label">Description:</div>
                      <div className="section-content">{description}</div>
                    </div>

                    <div className="project-section">
                      <div className="section-label">
                        Key Skills Demonstrated:
                      </div>
                      <div className="section-content">{skills}</div>
                    </div>

                    <div className="project-section">
                      <div className="section-label">
                        Potential Real-World Impact:
                      </div>
                      <div className="section-content">{impact}</div>
                    </div>

                    <div className="project-section">
                      <div className="section-label">Difficulty Level:</div>
                      <div className="section-content">{difficulty}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div className="results-section">
            <h2>Recommended Courses</h2>
            <ul className="courses-list">
              {courses.map((course, index) => (
                <li key={index} className="course-item">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-link"
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
            <h2>YouTube Courses</h2>
            <ul className="videos">
              {videos.map((video, index) => (
                <li key={index} className="video-item">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <div className="video-info">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-link"
                    >
                      {video.title}
                    </a>
                    <p className="video-channel">{video.channel}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
};



export default Home;
