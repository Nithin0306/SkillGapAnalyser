import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobTitle)
      return alert("Please upload a resume and enter a job title");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", jobTitle);

    try {
      // Analyze resume
      const resAnalysis = await fetch("http://localhost:8000/analyze_resume/", {
        method: "POST",
        body: formData,
      });
      const analysisData = await resAnalysis.json();
      setMissingSkills(analysisData.missing_skills.split(", "));

      // Fetch courses
      const resCourses = await fetch(
        `http://localhost:8000/fetch_courses/${jobTitle}`
      );
      const courseData = await resCourses.json();
      setCourses(courseData.courses);

      // Fetch YouTube videos
      const resVideos = await fetch(
        `http://localhost:8000/youtube-courses/${jobTitle}`
      );
      const videoData = await resVideos.json();
      setVideos(videoData.videos);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        AI-Based Skill Gap Analyzer
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center gap-4 w-full max-w-md"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Enter Job Title"
          value={jobTitle}
          onChange={handleJobTitleChange}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Analyze
        </button>
      </form>

      {loading && (
        <p className="text-center mt-4 text-gray-600">Processing...</p>
      )}

      {missingSkills.length > 0 && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-800">Missing Skills:</h2>
          <ul className="list-disc pl-6 text-gray-600">
            {missingSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {courses.length > 0 && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-800">
            Recommended Courses:
          </h2>
          <ul className="list-disc pl-6 text-blue-600">
            {courses.map((course, index) => (
              <li key={index}>
                <a href={course.link} target="_blank" rel="noopener noreferrer">
                  {course.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold text-gray-800">
            YouTube Recommendations:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full rounded"
                />
                <p className="mt-2 text-gray-800 font-medium">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {video.title}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
