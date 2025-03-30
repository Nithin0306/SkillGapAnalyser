import React from "react";
import Navbar from "../components/navbar";
import "../App.css";
const teamMembers = [
  { name: "Nithin Venkat Sharma", id: "CB.SC.U4CSE24239", phone: "7373093900" },
  { name: "Nishitha Kamalapathi", id: "CB.SC.U4CSE24238", phone: "7604841864" },
  { name: "Chittesh", id: "CB.SC.U4CSE24112", phone: "90809 03899" },
  
];

const TeamNovichoks = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen text-center p-5"
      style={{ backgroundImage: "url('bg2.jpg')" }}
    >
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-semibold italic">Skill Gap Analyzer</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="proo.html" className="hover:text-yellow-400">
                Home
              </a>
            </li>
            <li>
              <a href="aboutus.html" className="hover:text-yellow-400">
                About
              </a>
            </li>
            <li>
              <a href="features.html" className="hover:text-yellow-400">
                Features
              </a>
            </li>
            <li>
              <a href="team.html" className="hover:text-yellow-400">
                Team
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <h1 className="text-4xl text-blue-900 font-bold mt-6">Team Novichoks</h1>
      <h2 className="text-2xl text-green-600 mt-2">Meet Our Team</h2>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-5 w-64 transform transition duration-300 hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-blue-900">
              {member.name}
            </h3>
            <p className="text-gray-600 text-sm">{member.id}</p>
            <p className="text-gray-600 text-sm">📞 {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamNovichoks;
