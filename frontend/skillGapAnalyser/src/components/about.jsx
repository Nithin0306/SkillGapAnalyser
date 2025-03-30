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
      </div>
    </div>
  );
};

export default About;
