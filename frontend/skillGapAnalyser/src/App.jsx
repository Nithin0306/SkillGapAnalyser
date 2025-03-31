import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Navbar from "./components/navbar";
import Features from "./components/features";

import Header from "./components/header";

function App() {
  return (
    <Router>
    
      <Routes>
       
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
