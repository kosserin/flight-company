import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

const App = () => {
  return (
    <React.Fragment>
      {/* use this code to wrap flight form to get form behind navigation on mobile view <main style={{ position: "relative" }}>        
      </main> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
