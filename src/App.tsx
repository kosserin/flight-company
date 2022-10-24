import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Discover from "./pages/Discover/Discover";
import Reservation from "./pages/Reservation/Reservation";
import FlightContent from "./components/FlightContent/FlightContent";
import FlightDetail from "./components/FlightDetail/FlightDetail";

const App = () => {
  return (
    <React.Fragment>
      {/* use this code to wrap flight form to get form behind navigation on mobile view <main style={{ position: "relative" }}>        
      </main> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="discover" element={<Discover />} />
        <Route path="reservation" element={<Reservation />}>
          <Route path="flights" element={<FlightContent />}>
            <Route path=":flightId" element={<FlightDetail />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
