import Navbar from "../components/navbar";
import "../App.css";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>About Us</h1>
        <p>
          In today's job market, professionals struggle to identify skill gaps.
          Our tool provides personalized insights to help bridge those gaps.
        </p>
        <p>
          In today's competitive job market, individuals often struggle to
          identify the exact skill gaps preventing them from securing their
          desired roles. Generic career advice lacks personalization, and
          finding the right learning resources (from platforms like Coursera or
          YouTube) is time-consuming, making skill development inefficient.
        </p>
        <p>It also provides real life project recommendations</p>
        
      </div>
    </div>
  );
};

export default About;
